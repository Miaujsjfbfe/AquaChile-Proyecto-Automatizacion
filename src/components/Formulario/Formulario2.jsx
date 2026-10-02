import { useState } from 'react'

function Formulario2() {
  const [formData, setFormData] = useState({
    nombreCandidato: '',
    familiaCargo: '',
    nombreCargo: '',
    cv: null
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value, files } = e.target
    if (name === 'cv') {
      setFormData({ ...formData, cv: files[0] })
    } else {
      setFormData({ ...formData, [name]: value })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Preparamos los datos para enviarlos (FormData soporta archivos)
    const dataToSend = new FormData()
    dataToSend.append('nombreCandidato', formData.nombreCandidato)
    dataToSend.append('familiaCargo', formData.familiaCargo)
    dataToSend.append('nombreCargo', formData.nombreCargo)
    dataToSend.append('cv', formData.cv)

    try {
      // Reemplaza esta URL con la de tu Power Automate o Backend cuando la tengas
      const response = await fetch('URL_DE_TU_WEBHOOK_AQUI', {
        method: 'POST',
        body: dataToSend
      })

      if (response.ok) {
        alert('¡Solicitud enviada e inicio de automatización con éxito!')
        setFormData({
          nombreCandidato: '',
          familiaCargo: '',
          nombreCargo: '',
          cv: null
        })
        e.target.reset()
      } else {
        alert('Ocurrió un error al enviar la solicitud.')
      }
    } catch (error) {
      console.error('Error al conectar:', error)
      alert('Error de conexión. Revisa la URL del webhook.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div style={{ maxWidth: '500px', margin: '20px auto', padding: '20px', textAlign: 'left', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', backgroundColor: '#fff' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Solicitud de Evaluación Psicolaboral</h2>
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Nombre del Candidato:</label>
          <input 
            type="text" 
            name="nombreCandidato" 
            value={formData.nombreCandidato} 
            onChange={handleChange} 
            placeholder="Ej: Juan Pérez"
            required 
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Familia de Cargo:</label>
          <select 
            name="familiaCargo" 
            value={formData.familiaCargo} 
            onChange={handleChange} 
            required 
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }}
          >
            <option value="">Seleccione una opción...</option>
            <option value="Operaciones">Operaciones</option>
            <option value="Administración">Administración</option>
            <option value="Jefaturas">Jefaturas</option>
          </select>
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Nombre del Cargo:</label>
          <input 
            type="text" 
            name="nombreCargo" 
            value={formData.nombreCargo} 
            onChange={handleChange} 
            placeholder="Ej: Analista de Selección"
            required 
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Curriculum Vitae (CV):</label>
          <input 
            type="file" 
            name="cv" 
            accept=".pdf,.doc,.docx" 
            onChange={handleChange} 
            required 
            style={{ width: '100%' }}
          />
        </div>

        <button 
          type="submit" 
          disabled={isSubmitting}
          style={{ 
            padding: '12px', 
            marginTop: '10px', 
            cursor: isSubmitting ? 'not-allowed' : 'pointer',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            fontSize: '16px',
            fontWeight: 'bold'
          }}
        >
          {isSubmitting ? 'Enviando...' : 'Enviar Solicitud'}
        </button>
      </form>
    </div>
  )
}

export default Formulario2