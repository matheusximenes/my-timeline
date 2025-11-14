'use client'

import { db, ILabels } from '@/db/db.model'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline'
import { useState } from 'react'
import styles from '../event-details/event-form.module.scss'

interface LabelsFormProps {
	labels: ILabels[]
	onClose: () => void
}

const initialFormData: ILabels = {
	name: '',
	defaultColor: '#000000'
}

const LabelsForm = ({ labels, onClose }: LabelsFormProps) => {
	const [formData, setFormData] = useState(initialFormData)
	const { name, defaultColor } = formData

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { name, value } = e.target
		setFormData({ ...formData, [name]: value })
	}

	const clearForm = () => {
		if (formData.id) {
			const selectedEvent = labels.find((label) => label.id === formData.id) || null
			setFormData(selectedEvent!)
		} else {
			setFormData(initialFormData)
		}
	}

	const handleLabelSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		if (formData.id) {
			await db.labels.put({
				...formData
			})
		} else {
			await db.labels.add({
				...formData
			})
		}

		clearForm()
		onClose()
	}

	const handleDeleteLabel = async (id: number) => {
		await db.labels.delete(id)
	}

	return (
		<div className={styles.formContainer}>
			<h2>Manage Label</h2>
			<ul>
				{labels.map((label) => (
					<li key={label.id}>
						{label.name}
						<button onClick={() => handleDeleteLabel(label.id!)}>
							<DeleteForeverIcon fontSize='small' />
						</button>
						<button onClick={() => setFormData(label)}>
							<ModeEditOutlineIcon fontSize='small' />
						</button>
					</li>
				))}
			</ul>
			<form onSubmit={handleLabelSubmit}>
				<div className='row'>
					<label htmlFor='name'>
						{formData.id ? 'Edit label:' : 'New label:'}
						<input type='text' name='name' id='name' value={name} onChange={handleInputChange} />
					</label>
				</div>
				<div className='row'>
					<label htmlFor='color'>
						label color:
						<input
							type='color'
							id='defaultColor'
							name='defaultColor'
							value={defaultColor}
							onChange={handleInputChange}
						/>
					</label>
				</div>
				<div className='row'>
					<button type='button' onClick={clearForm}>
						clear
					</button>
					<button type='submit'>save</button>
				</div>
			</form>
		</div>
	)
}

export default LabelsForm
