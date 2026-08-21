import WebGLBackground from '@/components/webgl-background';

export default function Home() {
  return (
    <>
      <WebGLBackground />
      <div className="ui-layer corner-marks">
        <div className="bottom-marks" />
        
        <header className="sys-info">
          <div className="sys-info-item">
            <div className="sys-info-label">Agency</div>
            <div className="sys-info-value">AI Automation</div>
          </div>
          <div className="sys-info-item">
            <div className="sys-info-label">Role</div>
            <div className="sys-info-value">Deploy + Train</div>
          </div>
          <div className="sys-info-item">
            <div className="sys-info-label">Loc</div>
            <div className="sys-info-value">53.5461° N, 113.4938° W</div>
          </div>
        </header>

        <main className="hero">
          <h1 className="hero-title">
            We make teams<br />
            <span className="hero-title-italic">AI-</span>
            native.
          </h1>
        </main>

        <footer className="definition-block">
          <div className="definition">
            <div className="definition-word">native</div>
            <div className="definition-phonetic">/ˈneɪtɪv/</div>
            <div className="definition-type">adjective</div>
            <div className="definition-text">
              A team that actually uses the AI installed in their work. Not a ChatGPT tab they opened once and ignore. 
              We deploy the workflows, train the people, and make the tools part of how the company operates.
            </div>
          </div>
          <nav className="nav">
            <a href="/one-job">One Job</a>
            <a href="/about">About</a>
            <a href="https://agency7.ca" target="_blank" rel="noopener noreferrer">Agency7.ca</a>
            <a href="https://agency7.ca/#book" target="_blank" rel="noopener noreferrer">Book</a>
            <a href="mailto:anders@a7.team">Contact</a>
          </nav>
        </footer>
      </div>
    </>
  );
}
