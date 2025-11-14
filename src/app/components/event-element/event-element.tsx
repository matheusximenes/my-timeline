import { Era, ITimelineEvent, Type } from '@/db/db.model'
import MapIcon from '@mui/icons-material/Map'
import styles from './event-element.module.scss'
import { getDistance, getDistanceFromStart } from './utils'

export interface ITimelineBounds {
	minYear: number
	minEra: Era
	maxYear: number
	maxEra: Era
}

interface EventsProps {
	event: ITimelineEvent
	deleteEvent: (id: number) => Promise<void>
	handleSelectEvent: (e: ITimelineEvent) => void
	years: {
		year: number
		era: Era
	}[]
	selectedEvent: ITimelineEvent | null
}

const Events = ({ event, handleSelectEvent, years, selectedEvent }: EventsProps) => {
	const {
		startYear,
		endYear,
		startType,
		endType,
		startEra,
		endEra,
		id,
		customBgColor,
		mainLinkName,
		mainLinkUrl,
		mapLinkUrl,
		mapName,
		customColor
	} = event
	const distance = getDistance(startYear, endYear, startEra, endEra)
	const distanceFromStart = getDistanceFromStart(years, startEra, startYear)
	const isInactive = selectedEvent?.id !== event.id

	return (
		<li
			className={styles.event}
			style={{ marginLeft: `${distanceFromStart}px`, width: `${distance}px` }}
		>
			{event.isLandmark && <div className={styles.isLandmark} />}
			<button
				onClick={() => handleSelectEvent(event)}
				className={`${styles.button} ${selectedEvent && isInactive ? styles.inactive : ''}`}
			>
				<div className={styles.header} style={customColor ? { color: customColor } : {}}>
					<div className={`${styles.title} ${event.isLandmark ? styles.landmark : ''}`}>
						{event.mainImgUrl && (
							<div className={styles.mainImage}>
								<img src={event.mainImgUrl} alt={event.title} />
							</div>
						)}
						<span>
							{event.title} {event.description && `- ${event.description}`}
						</span>
					</div>
					{mainLinkUrl && (
						<a href={mainLinkUrl} target='_blank'>
							{mainLinkName}
						</a>
					)}
					<div className={styles.dates}>
						({startYear}
						<span className={styles.era}>{startEra}</span> - {endYear}
						<span className={styles.era}>{endEra}</span>)
					</div>
				</div>
				<div className={styles.lineWrapper}>
					<div className={styles.line} style={{ width: `${distance}px` }}>
						{startType === Type.INACCURATE && (
							<div className={styles.line_inner_start}>
								<div style={{ backgroundColor: customBgColor }} />
								<div style={{ backgroundColor: customBgColor }} />
								<div style={{ backgroundColor: customBgColor }} />
								<div style={{ backgroundColor: customBgColor }} />
								<div style={{ backgroundColor: customBgColor }} />
							</div>
						)}
						<div className={styles.line_inner} style={{ backgroundColor: customBgColor }} />
						{endType === Type.INACCURATE && (
							<div className={styles.line_inner_end}>
								<div style={{ backgroundColor: customBgColor }} />
								<div style={{ backgroundColor: customBgColor }} />
								<div style={{ backgroundColor: customBgColor }} />
								<div style={{ backgroundColor: customBgColor }} />
								<div style={{ backgroundColor: customBgColor }} />
							</div>
						)}
					</div>
					{mapLinkUrl && (
						<a
							href={mapLinkUrl}
							className={styles.map}
							title={event.title + ' map'}
							target='_blank'
							style={{ color: customBgColor }}
							onClick={(e) => {
								e.stopPropagation()
							}}
						>
							{<MapIcon fontSize='small' />}
						</a>
					)}
				</div>
			</button>
		</li>
	)
}

export default Events
