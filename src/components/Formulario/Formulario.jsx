import React, { useState } from 'react';

export default function FormularioEvaluacion() {
  const [formData, setFormData] = useState({
    nombreCandidato: '',
    familiaCargo: '',
    nombreCargo: '',
  });
  const [cvFile, setCvFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mensaje, setMensaje] = useState(null);

  // Manejo de cambios en los inputs de texto/select
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Manejo del archivo adjunto (CV)
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setCvFile(e.target.files[0]);
    }
  };

  // Envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMensaje(null);

    // Creamos un FormData para enviar texto y el archivo binario
    const dataToSend = new FormData();
    dataToSend.append('nombreCandidato', formData.nombreCandidato);
    dataToSend.append('familiaCargo', formData.familiaCargo);
    dataToSend.append('nombreCargo', formData.nombreCargo);
    dataToSend.append('cvFile', cvFile);

    try {
      // Reemplaza esta URL con la tuya (Power Automate Webhook o tu propio Backend)
      const response = await fetch('YOUR_WEBHOOK_OR_BACKEND_URL_HERE', {
        method: 'POST',
        body: dataToSend,
      });

      if (response.ok) {
        setMensaje({ tipo: 'éxito', texto: '¡Solicitud enviada e inicio de automatización con éxito!' });
        // Reiniciar formulario
        setFormData({ nombreCandidato: '', familiaCargo: '', nombreCargo: '' });
        setCvFile(null);
        e.target.reset();
      } else {
        throw new Error('Error al enviar la solicitud.');
      }
    } catch (error) {
      setMensaje({ tipo: 'error', texto: 'Ocurrió un error al enviar el formulario. Inténtalo de nuevo.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Solicitud de Evaluación Psicolaboral</h2>
      <p style={styles.subtitle}>Proyecto AquaChile - Automatización</p>

      {mensaje && (
        <div style={mensaje.tipo === 'éxito' ? styles.alertSuccess : styles.alertError}>
          {mensaje.texto}
        </div>
      )}

      <form onSubmit={handleSubmit} style={styles.form}>
        {/* Nombre del Candidato */}
        <div style={styles.fieldGroup}>
          <label style={styles.label}>Nombre del Candidato *</label>
          <input
            type="text"
            name="nombreCandidato"
            value={formData.nombreCandidato}
            onChange={handleChange}
            placeholder="Ej: Juan Pérez"
            required
            style={styles.input}
          />
        </div>

        {/* Familia de Cargo */}
        <div style={styles.fieldGroup}>
          <label style={styles.label}>Familia de Cargo *</label>
          <select
            name="familiaCargo"
            value={formData.familiaCargo}
            onChange={handleChange}
            required
            style={styles.select}
          >
            <option value="">Selecciona una opción</option>
            <option value="Operaciones">Operaciones / Planta</option>
            <option value="Jefaturas">Jefaturas / Supervisión</option>
            <option value="Administrativo">Administrativo / Profesional</option>
            <option value="Mantenimiento">Mantenimiento / Técnico</option>
          </select>
        </div>

        {/* Nombre del Cargo */}
        <div style={styles.fieldGroup}>
          <label style={styles.label}>Nombre del Cargo *</label>
          <input
            type="text"
            name="nombreCargo"
            value={formData.nombreCargo}
            onChange={handleChange}
            placeholder="Ej: Analista de Calidad"
            required
            style={styles.input}
          />
        </div>

        {/* Curriculum Vitae (CV) */}
        <div style={styles.fieldGroup}>
          <label style={styles.label}>Curriculum Vitae (PDF/Doc) *</label>
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
            required
            style={styles.fileInput}
          />
        </div>

        {/* Botón Submit */}
        <button type="submit" disabled={isSubmitting} style={styles.button}>
          {isSubmitting ? 'Enviando...' : 'Crear Solicitud'}
        </button>
      </form>
    </div>
  );
}

// Estilos sencillos en línea para dejarlo bonito de inmediato
const styles = {
  container: {
    maxWidth: '500px',
    margin: '40px auto',
    padding: '30px',
    borderRadius: '12px',
    backgroundColor: '#ffffff',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
    fontFamily: 'Arial, sans-serif',
  },
  title: {
    margin: '0 0 5px 0',
    fontSize: '22px',
    color: '#1e293b',
    textAlign: 'center',
  },
  subtitle: {
    margin: '0 0 25px 0',
    fontSize: '14px',
    color: '#64748b',
    textAlign: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '18px',
  },
  fieldGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  label: {
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#334155',
  },
  input: {
    padding: '10px 12px',
    fontSize: '14px',
    borderRadius: '6px',
    border: '1px solid #cbd5e1',
    outline: 'none',
  },
  select: {
    padding: '10px 12px',
    fontSize: '14px',
    borderRadius: '6px',
    border: '1px solid #cbd5e1',
    backgroundColor: '#fff',
    outline: 'none',
  },
  fileInput: {
    padding: '8px',
    fontSize: '13px',
  },
  button: {
    marginTop: '10px',
    padding: '12px',
    fontSize: '15px',
    fontWeight: 'bold',
    color: '#fff',
    backgroundColor: '#0284c7',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
  alertSuccess: {
    padding: '10px 14px',
    marginBottom: '15px',
    borderRadius: '6px',
    backgroundColor: '#dcfce7',
    color: '#166534',
    fontSize: '14px',
  },
  alertError: {
    padding: '10px 14px',
    marginBottom: '15px',
    borderRadius: '6px',
    backgroundColor: '#fee2e2',
    color: '#991b1b',
    fontSize: '14px',
  },
};