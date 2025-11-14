import { ILabels } from '@/db/db.model'
import styles from './labels.module.scss'

interface LabelsProps {
	labels?: ILabels[]
	activeLabels: ILabels[]
	handleActiveLabels: (l: ILabels) => void
}

const Labels = ({ labels, handleActiveLabels, activeLabels }: LabelsProps) => {
	return (
		<ul className={styles.container}>
			{labels?.map((l) => {
				const isActive = activeLabels.length === 0 || activeLabels.find((lb) => lb === l)
				return (
					<li key={l.id}>
						<button
							className={isActive ? '' : styles.inactive}
							onClick={() => handleActiveLabels(l)}
						>
							{l.name}
						</button>
					</li>
				)
			})}
		</ul>
	)
}

export default Labels
