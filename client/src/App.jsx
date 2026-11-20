
import { useState, useRef, useCallback } from 'react';

import LegacySimpleForm from './components/legacy/LegacySimpleForm.jsx';
import RefactoredSimpleForm from './components/refactored/RefactoredSimpleForm.jsx';

/**
 * LAB 4 - EXERCISE 1.3
 * Interactive Comparison & Execution Trace Dashboard
 *
 * Part A: Legacy Anti-Pattern
 * - 5 chained useEffect hooks.
 * - Duplicated parent/child state.
 * - Effect-driven validation synchronization.
 *
 * Part B: Refactored React 19
 * - Single source of truth.
 * - Synchronous derived validation state.
 * - Zero useEffect synchronization chains.
 *
 * Trace Logger:
 * - Render counters stored in useRef.
 * - Logs stored in useRef.
 * - Console logging mirrors execution traces.
 * - DOM-based terminal updates avoid React state updates
 *   caused by logging.
 */

function App() {
  // Required React hook import; no App state is needed for logging.
  const [, setUnusedState] = useState(0);

  // 1. Render Counters (Non-reactive storage)
  const legacyRenderCountRef = useRef(0);
  const refactoredRenderCountRef = useRef(0);

  // 2. Execution Trace Buffer
  const logsRef = useRef([]);

  // 3. DOM References
  const terminalRef = useRef(null);
  const legacyCounterRef = useRef(null);
  const refactoredCounterRef = useRef(null);

  // 4. Flush Scheduling Guard
  const flushScheduledRef = useRef(false);

  /**
   * Classify log messages for terminal styling.
   */
  const getLogType = useCallback((message) => {
    if (
      message.includes('CASCADE DETECTED') ||
      message.includes('WARNING:') ||
      message.includes('Maximum update depth') ||
      message.includes('Race Conditions') ||
      message.includes('SUBMIT BLOCKED')
    ) {
      return 'alert';
    }

    if (
      message.includes('useEffect') ||
      message.includes('syncToParent') ||
      message.includes('validateField') ||
      message.includes('calcFormValidity') ||
      message.includes('syncErrorsToChild') ||
      message.includes('autoScrollToError')
    ) {
      return 'effect';
    }

    if (
      message.includes('render') ||
      message.includes('RENDER')
    ) {
      return 'render';
    }

    if (
      message.includes('SUCCESS') ||
      message.includes('SUBMITTED')
    ) {
      return 'success';
    }

    return 'info';
  }, []);

  /**
   * 5. Direct DOM Terminal Rendering
   *
   * This function updates the terminal without setState.
   * Therefore, logging does not trigger React re-renders.
   */
  const flushTrace = useCallback(() => {
    flushScheduledRef.current = false;

    const terminal = terminalRef.current;

    if (!terminal) return;

    const fragment = document.createDocumentFragment();

    logsRef.current.forEach((entry) => {
      const line = document.createElement('div');

      line.className = `trace-line ${entry.type}`;

      if (entry.message.includes('CASCADE DETECTED')) {
        line.classList.add('cascade-detected');
      }

      if (
        entry.message.includes('Race Conditions') ||
        entry.message.includes('Maximum update depth')
      ) {
        line.classList.add('race-condition');
      }

      line.textContent = `[${entry.timestamp}] ${entry.message}`;

      fragment.appendChild(line);
    });

    terminal.replaceChildren(fragment);

    // Automatically scroll to the newest trace.
    terminal.scrollTop = terminal.scrollHeight;

    // Update render counter badges directly.
    if (legacyCounterRef.current) {
      legacyCounterRef.current.textContent =
        `Total renders: ${legacyRenderCountRef.current}`;
    }

    if (refactoredCounterRef.current) {
      refactoredCounterRef.current.textContent =
        `Total renders: ${refactoredRenderCountRef.current}`;
    }
  }, []);

  /**
   * 6. Schedule a Buffered Terminal Refresh
   *
   * Multiple logs within the same execution cycle are
   * grouped into one microtask.
   */
  const scheduleFlush = useCallback(() => {
    if (flushScheduledRef.current) return;

    flushScheduledRef.current = true;

    queueMicrotask(() => {
      flushTrace();
    });
  }, [flushTrace]);

  /**
   * 7. Centralized Trace Logger
   */
  const logTrace = useCallback((message) => {
    const timestamp = new Date().toLocaleTimeString();

    const entry = {
      timestamp,
      message,
      type: getLogType(message)
    };

    logsRef.current.push(entry);

    // Mirror execution trace to browser DevTools.
    console.log(`[${timestamp}] ${message}`);

    scheduleFlush();
  }, [getLogType, scheduleFlush]);

  /**
   * 8. Legacy Render Counter
   */
  const incrementLegacyRender = useCallback(() => {
    legacyRenderCountRef.current += 1;

    console.log(
      `[LEGACY] Render count: ${legacyRenderCountRef.current}`
    );

    scheduleFlush();
  }, [scheduleFlush]);

  /**
   * 9. Refactored Render Counter
   */
  const incrementRefactoredRender = useCallback(() => {
    refactoredRenderCountRef.current += 1;

    console.log(
      `[REFACTORED] Render count: ${refactoredRenderCountRef.current}`
    );

    scheduleFlush();
  }, [scheduleFlush]);

  /**
   * 10. Clear Execution Trace
   *
   * Clears logs without resetting render counters.
   * Uses direct DOM manipulation to avoid extra renders.
   */
  const handleClearTrace = useCallback(() => {
    logsRef.current = [];

    console.clear();

    console.log('[SYSTEM] Execution trace cleared.');

    logsRef.current.push({
      timestamp: new Date().toLocaleTimeString(),
      message: 'Execution trace cleared. Ready for new input.',
      type: 'info'
    });

    scheduleFlush();
  }, [scheduleFlush]);

  return (
    <main className="app-container">

      {/* Application Header */}
      <header className="app-header">
        <h1>
          Lab 4 — Exercise 1.3
        </h1>

        <p>
          Deconstructing useEffect Validation Cascades
        </p>

        <p className="subtitle">
          A side-by-side architectural comparison between
          legacy React state synchronization and React 19
          synchronous derived state.
        </p>
      </header>

      {/* Architecture Comparison */}
      <section className="comparison-grid">

        {/* Part A: Legacy Anti-Pattern */}
        <div>
          <LegacySimpleForm
            onLog={logTrace}
            onRenderCount={incrementLegacyRender}
          />

          <div style={{ marginTop: '12px' }}>
            <span
              ref={legacyCounterRef}
              className="render-counter-badge"
            >
              Total renders: 0
            </span>
          </div>
        </div>

        {/* Part B: Refactored React 19 */}
        <div>
          <RefactoredSimpleForm
            onLog={logTrace}
            onRenderCount={incrementRefactoredRender}
          />

          <div style={{ marginTop: '12px' }}>
            <span
              ref={refactoredCounterRef}
              className="render-counter-badge"
            >
              Total renders: 0
            </span>
          </div>
        </div>

      </section>

      {/* Execution Trace Dashboard */}
      <section className="trace-section">

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '12px',
            marginBottom: '16px'
          }}
        >
          <div>
            <h2>
              Execution Trace Terminal
            </h2>

            <p className="trace-section-description">
              Live execution logs showing render cycles,
              useEffect execution order, and cascade detection.
            </p>
          </div>

          <button
            type="button"
            className="btn"
            onClick={handleClearTrace}
            style={{
              color: '#ffffff',
              background: '#475569',
              borderColor: '#475569'
            }}
          >
            Clear Trace Log
          </button>
        </div>

        <div className="trace-terminal">

          {/* macOS-style Terminal Header */}
          <div className="trace-terminal-header">
            <span className="terminal-dot red" />
            <span className="terminal-dot yellow" />
            <span className="terminal-dot green" />

            <span className="trace-terminal-title">
              execution_trace.log
            </span>
          </div>

          {/* Terminal Log Content */}
          <div
            ref={terminalRef}
            className="trace-terminal-content"
            role="log"
            aria-live="polite"
            aria-label="React execution trace"
          >
            <div className="trace-line info">
              [SYSTEM] Lab 4 - Exercise 1.3 initialized.
            </div>

            <div className="trace-line info">
              [SYSTEM] Waiting for user interaction...
            </div>

          </div>

        </div>

        {/* Trace Legend */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '20px',
            marginTop: '14px'
          }}
        >
          <span className="trace-line effect">
            ● useEffect execution
          </span>

          <span className="trace-line render">
            ● Component render
          </span>

          <span className="trace-line alert">
            ● Cascade / Warning
          </span>
        </div>

      </section>

      {/* Architecture Summary */}
      <footer
        style={{
          marginTop: '36px',
          padding: '20px',
          color: '#64748b',
          background: '#ffffff',
          border: '1px solid #e2e8f0',
          borderRadius: '12px',
          textAlign: 'center',
          fontSize: '0.85rem',
          lineHeight: 1.7
        }}
      >
        <strong style={{ color: '#334155' }}>
          Lab 4 — Exercise 1.3
        </strong>

        <p style={{ margin: '6px 0 0' }}>
          Legacy: Effect-driven state synchronization.
          <br />
          Refactored: Synchronous derived state with zero
          useEffect synchronization chains.
        </p>
      </footer>

    </main>
  );
}

export default App;
