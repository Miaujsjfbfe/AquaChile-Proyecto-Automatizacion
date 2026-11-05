import { useNavigate } from "react-router-dom";

export default function DetalleCandidato() {
  const navigate = useNavigate();

  return (
    <div className="container-fluid p-4" style={{ backgroundColor: "#f4f6f9", minHeight: "100vh" }}>
      {/* Botón Volver */}
      <button 
        className="btn btn-link text-decoration-none mb-3 p-0" 
        onClick={() => navigate("/dashboard")}
      >
        ← Volver al Dashboard
      </button>

      {/* Encabezado Principal */}
      <div className="d-flex justify-content-between align-items-center mb-4 bg-white p-3 rounded shadow-sm">
        <div className="d-flex align-items-center gap-3">
          <div 
            className="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold fs-4" 
            style={{ width: "60px", height: "60px", backgroundColor: "#002b49" }}
          >
            RM
          </div>
          <div>
            <div className="d-flex align-items-center gap-2">
              <h3 className="m-0 fw-bold" style={{ color: "#002b49" }}>Rodrigo Morales Valdés</h3>
              <span className="badge bg-primary">En Entrevista</span>
              <span className="badge bg-light text-dark">#AQ-1042</span>
            </div>
            <p className="text-muted m-0 small">
              Jefe Centro Cultivo Aysén • RUT 15.824.912-8 • Fiordo Cupquelán
            </p>
          </div>
        </div>
        <button className="btn btn-dark fw-bold px-4">Dictaminar</button>
      </div>

      {/* Grid de Resumen e Indicadores */}
      <div className="row g-3 mb-4">
        {/* Índice de Idoneidad */}
        <div className="col-md-4">
          <div className="card border-0 shadow-sm text-white p-3 h-100" style={{ backgroundColor: "#002b49" }}>
            <div className="d-flex justify-content-between align-items-center mb-2">
              <span className="small text-uppercase fw-bold opacity-75">Índice de Idoneidad</span>
              <span className="badge bg-info text-dark">Percentil 94</span>
            </div>
            <h1 className="display-4 fw-bold m-0">92 <span className="fs-5 fw-normal">/100</span></h1>
            <div className="progress mt-3" style={{ height: "6px" }}>
              <div className="progress-bar bg-info" style={{ width: "92%" }}></div>
            </div>
          </div>
        </div>

        {/* Competencias Críticas */}
        <div className="col-md-8">
          <div className="card border-0 shadow-sm p-3 h-100">
            <h6 className="fw-bold mb-3" style={{ color: "#002b49" }}>Competencias Críticas</h6>
            <div className="row g-3">
              <div className="col-6">
                <small className="d-block text-muted">Liderazgo y Autonomía (95%)</small>
                <div className="progress" style={{ height: "6px" }}>
                  <div className="progress-bar" style={{ width: "95%", backgroundColor: "#0056b3" }}></div>
                </div>
              </div>
              <div className="col-6">
                <small className="d-block text-muted">Tolerancia al Estrés 14x14 (90%)</small>
                <div className="progress" style={{ height: "6px" }}>
                  <div className="progress-bar" style={{ width: "90%", backgroundColor: "#0056b3" }}></div>
                </div>
              </div>
              <div className="col-6">
                <small className="d-block text-muted">Seguridad y Protocolos (94%)</small>
                <div className="progress" style={{ height: "6px" }}>
                  <div className="progress-bar" style={{ width: "94%", backgroundColor: "#0056b3" }}></div>
                </div>
              </div>
              <div className="col-6">
                <small className="d-block text-muted">Trabajo en Equipo (88%)</small>
                <div className="progress" style={{ height: "6px" }}>
                  <div className="progress-bar" style={{ width: "88%", backgroundColor: "#0056b3" }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sección Inferior: Ficha, Baterías, Síntesis y Dictamen */}
      <div className="row g-3">
        {/* Columna Izquierda */}
        <div className="col-md-7">
          {/* Ficha del Postulante */}
          <div className="card border-0 shadow-sm p-3 mb-3">
            <h6 className="fw-bold mb-3" style={{ color: "#002b49" }}>Ficha del Postulante</h6>
            <div className="row g-2 mb-3">
              <div className="col-6">
                <div className="p-2 bg-light rounded">
                  <small className="text-muted d-block">EMAIL</small>
                  <strong>rodrigo.morales.v@gmail.com</strong>
                </div>
              </div>
              <div className="col-6">
                <div className="p-2 bg-light rounded">
                  <small className="text-muted d-block">TELÉFONO</small>
                  <strong>+56 9 8452 1190</strong>
                </div>
              </div>
            </div>
            <div className="p-2 bg-light rounded d-flex justify-content-between align-items-center">
              <span>📄 <strong>CV_Rodrigo_Morales_2024.pdf</strong></span>
              <button className="btn btn-sm btn-outline-primary">Descargar CV</button>
            </div>
          </div>

          {/* Baterías Psicométricas */}
          <div className="card border-0 shadow-sm p-3">
            <h6 className="fw-bold mb-3" style={{ color: "#002b49" }}>Baterías Psicométricas</h6>
            <ul className="list-group list-group-flush">
              <li className="list-group-flush border-bottom py-2 d-flex justify-content-between">
                <span>Test Wonderlic</span>
                <strong>29/50</strong>
              </li>
              <li className="list-group-flush border-bottom py-2 d-flex justify-content-between">
                <span>DISC AquaChile</span>
                <strong>D-C</strong>
              </li>
              <li className="list-group-flush py-2 d-flex justify-content-between">
                <span>Zulliger & Lüscher</span>
                <strong className="text-success">Aprobado</strong>
              </li>
            </ul>
          </div>
        </div>

        {/* Columna Derecha */}
        <div className="col-md-5">
          {/* Síntesis Clínica */}
          <div className="card border-0 shadow-sm p-3 mb-3">
            <h6 className="fw-bold mb-2" style={{ color: "#002b49" }}>Síntesis Clínica</h6>
            <blockquote className="blockquote fs-6 text-muted border-start border-3 border-primary ps-3 my-2">
              "Excelente estabilidad emocional, idóneo para turnos 14x14 en fiordos con alta autogestión y apego a normas de seguridad."
            </blockquote>
          </div>

          {/* Dictamen */}
          <div className="card border-0 shadow-sm p-3">
            <h6 className="fw-bold mb-3" style={{ color: "#002b49" }}>Dictamen</h6>
            <div className="btn-group w-100 mb-3" role="group">
              <button className="btn btn-outline-success active">Idóneo</button>
              <button className="btn btn-outline-warning">Con Obs.</button>
              <button className="btn btn-outline-danger">No Idóneo</button>
            </div>
            <button className="btn btn-dark w-100 fw-bold">Confirmar Dictamen</button>
          </div>
        </div>
      </div>
    </div>
  );
}