import React, { useState } from 'react';
import { Formik } from 'formik';

const Formulario = () => {
	const [formularioEnviado, setFormularioEnviado] = useState(false);
	return (
		<>
			<Formik
				initialValues={{
					nombre: '',
					correo: '',
				}}
				//Validate tambien tiene acceso a los valores ingresados en los inputs
				validate={(valores) => {
					let errores = {};
					//si no hay valorantes en input nombre:
					if(!valores.nombre) {
						errores.nombre = "Por favor ingresa un nombre"
						console.log('Ingresa un nombre')
					} else if(!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valores.nombre)) {
						errores.nombre = 'El nombre solo puede contener letras y espacios'
					}

					//Validacion de correo

					if(!valores.correo) {
						errores.correo = "Por favor ingresa un correo"
						console.log('Ingresa un correo')
					} else if(!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(valores.correo)) {
						errores.correo = 'El correo solo puede contener letras, numeros, puntos, guiones y guion bajo.'
					}

					return errores;
				}}
				// En el onSubmit se pueden acceder a los valores ingresados en los inputs, te los pasa como un objeto.
				onSubmit={(valores, {resetForm}) => {
					//resetea el formulario
					resetForm();
					setFormularioEnviado(true);
					setTimeout(() => setFormularioEnviado(false), 5000);
					console.log('Formulario enviado');
				}}
			>
				{({handleSubmit, values, handleChange, handleBlur, errors, touched}) => (
					<form className='formulario' onSubmit={handleSubmit}>
						<div>
							<label htmlFor="nombre">Nombre</label>
							<input 
								type="text" 
								id="nombre" 
								name="nombre" 
								placeholder='John Doe' 
								value={values.nombre} 
								onChange={handleChange}
								onBlur={handleBlur}
							/>
							{touched.nombre && errors.nombre && <div className='error'>{errors.nombre}</div>}
						</div>
						<div>
							<label htmlFor="correo">Correo</label>
							<input 
								type="email" 
								id="correo" 
								name="correo" 
								placeholder='Email@email.com' 
								value={values.correo} 
								onChange={handleChange}
								// HandleBlur para cuando el usuario sale del input, va a ejecutar una funcion que va a validar el field
								onBlur={handleBlur}
							/>
							{touched.correo && errors.correo && <div className='error'>{errors.correo}</div>}
						</div>
						<button type="submit">Enviar</button>
						{formularioEnviado && <p className="exito">Formulario enviado con exito</p>}
					</form>
				)}
			</Formik>
		</>
	);
}
 
export default Formulario;