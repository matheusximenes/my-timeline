'use client'

import { Era, ILabels, ITimelineEvent, Type } from '@/db/db.model'
import styles from './event-form.module.scss'
import { handleFormValidation } from './utils'
interface IFormProps {
	activeEvent: ITimelineEvent | null
	labelsList: ILabels[] | undefined
	onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
	onCheck: (e: React.ChangeEvent<HTMLInputElement>) => void
	onSelect: (e: React.ChangeEvent<HTMLSelectElement>) => void
	onClear: () => void
	onSave: (e: React.FormEvent<HTMLFormElement>) => Promise<void>
	onClose: () => void
	deleteEvent: () => void
}

const borderStyles = [
	'none',
	'solid',
	'dashed',
	'dotted',
	'double',
	'groove',
	'ridge',
	'inset',
	'outset'
]

const EventForm = ({
	activeEvent,
	labelsList,
	onChange,
	onSelect,
	onSave,
	onClear,
	onCheck,
	deleteEvent
}: IFormProps) => {
	const {
		id,
		order,
		title,
		description,
		startYear,
		startType,
		startEra,
		endYear,
		endType,
		endEra,
		isLandmark,
		mainImgName,
		mainImgUrl,
		mainLinkName,
		mainLinkUrl,
		labels,
		customBgColor,
		customColor,
		customLineColor,
		customLineType,
		mapName,
		mapLinkUrl
	} = activeEvent || {}

	return (
		<div className={styles.formContainer}>
			<h2>Event</h2>
			<form onSubmit={onSave}>
				<div className='row'>
					<label htmlFor='title'>
						Title
						<input type='text' id='title' name='title' value={title} onChange={onChange} />
					</label>
				</div>
				<div className='row'>
					<label htmlFor='description'>
						Description
						<input
							type='text'
							id='description'
							name='description'
							value={description}
							onChange={onChange}
						/>
					</label>
				</div>
				<div className='row'>
					<label htmlFor='isLandMark'>
						Is Landmark
						<input
							type='checkbox'
							id='isLandmark'
							name='isLandmark'
							checked={isLandmark}
							onChange={onCheck}
						/>
					</label>
				</div>
				<div className='row'>
					<label htmlFor='mainImgName'>
						Main Image Name
						<input
							type='text'
							id='mainImgName'
							name='mainImgName'
							value={mainImgName}
							onChange={onChange}
						/>
					</label>
					<label htmlFor='mainImgUrl'>
						Main Image URL
						<input
							type='text'
							id='mainImgUrl'
							name='mainImgUrl'
							value={mainImgUrl}
							onChange={onChange}
						/>
					</label>
				</div>
				<div className='row'>
					<label htmlFor='order'>
						Order
						<input type='number' id='order' name='order' value={order} onChange={onChange} />
					</label>
				</div>
				<div className='row'>
					<label htmlFor='startEra'>
						Start era
						<select id='startEra' name='startEra' value={startEra ?? ''} onChange={onChange}>
							<option value={Era.BCE}>{Era.BCE}</option>
							<option value={Era.CE}>{Era.CE}</option>
						</select>
					</label>
					<label htmlFor='startYear'>
						Start year
						<input
							type='number'
							id='startYear'
							name='startYear'
							value={startYear ?? ''}
							onChange={onChange}
						/>
					</label>
					<label htmlFor='startType'>
						Start type
						<select id='startType' name='startType' value={startType ?? ''} onChange={onChange}>
							<option value={Type.ACCURATE}>{Type.ACCURATE}</option>
							<option value={Type.INACCURATE}>{Type.INACCURATE}</option>
						</select>
					</label>
				</div>
				<div className='row'>
					<label htmlFor='endEra'>
						End era
						<select id='endEra' name='endEra' value={endEra ?? ''} onChange={onChange}>
							<option value={Era.BCE}>{Era.BCE}</option>
							<option value={Era.CE}>{Era.CE}</option>
						</select>
					</label>
					<label htmlFor='endYear'>
						End year
						<input
							type='number'
							id='endYear'
							name='endYear'
							value={endYear ?? ''}
							onChange={onChange}
						/>
					</label>
					<label htmlFor='endType'>
						End type
						<select id='endType' name='endType' value={endType ?? ''} onChange={onChange}>
							<option value={Type.ACCURATE}>{Type.ACCURATE}</option>
							<option value={Type.INACCURATE}>{Type.INACCURATE}</option>
						</select>
					</label>
				</div>
				<div className='row'>
					<label htmlFor='mainLinkName'>
						Main Link Name
						<input
							type='text'
							id='mainLinkName'
							name='mainLinkName'
							value={mainLinkName}
							onChange={onChange}
						/>
					</label>
					<label htmlFor='mainLinkUrl'>
						Main Link URL
						<input
							type='text'
							id='mainLinkUrl'
							name='mainLinkUrl'
							value={mainLinkUrl}
							onChange={onChange}
						/>
					</label>
				</div>
				<div className='row'>
					<label htmlFor='mapName'>
						Map Name
						<input type='text' id='mapName' name='mapName' value={mapName} onChange={onChange} />
					</label>
					<label htmlFor='mapLinkUrl'>
						Map Link URL
						<input
							type='text'
							id='mapLinkUrl'
							name='mapLinkUrl'
							value={mapLinkUrl}
							onChange={onChange}
						/>
					</label>
				</div>
				<div className='row'>
					<label htmlFor='labels'>
						Labels
						<select multiple id='labels' name='labels' value={labels ?? []} onChange={onSelect}>
							{labelsList?.map((label) => (
								<option key={label.id} value={label.name}>
									{label.name}
								</option>
							))}
						</select>
					</label>
				</div>
				<div className='row'>
					<label htmlFor='customBgColor'>
						Background color
						<input
							type='color'
							id='customBgColor'
							name='customBgColor'
							value={customBgColor}
							onChange={onChange}
						/>
					</label>
					<label htmlFor='customColor'>
						Font color
						<input
							type='color'
							id='customColor'
							name='customColor'
							value={customColor}
							onChange={onChange}
						/>
					</label>
				</div>
				{isLandmark && (
					<div className='row'>
						<label htmlFor='customLineColor'>
							Outline Color
							<input
								type='color'
								id='customLineColor'
								name='customLineColor'
								value={customLineColor}
								onChange={onChange}
							/>
						</label>
						<label htmlFor='customLineType'>
							Line Type
							<select
								id='customLineType'
								name='customLineType'
								value={customLineType}
								onChange={onChange}
							>
								{borderStyles.map((style) => (
									<option key={style} value={style}>
										{style.charAt(0).toUpperCase() + style.slice(1)}
									</option>
								))}
							</select>
						</label>
					</div>
				)}
				<div className='row'>
					<button type='button' onClick={onClear}>
						Clear
					</button>
					<button type='submit' disabled={handleFormValidation(activeEvent)}>
						Save
					</button>
					{id && <button onClick={deleteEvent}>Delete</button>}
				</div>
			</form>
		</div>
	)
}

export default EventForm
