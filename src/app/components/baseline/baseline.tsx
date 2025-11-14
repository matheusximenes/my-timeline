import styles from './baseline.module.scss'

interface BaselineProps {
	years: { year: number; era: string }[]
	step: number
}

const Baseline = ({ years, step }: BaselineProps) => {
	return (
		<ul className={styles.baseline}>
			{years.map((year, index) => (
				<li
					key={year.year + year.era}
					className={styles.baselineYear}
					style={{ marginRight: `${step - 1}px` }}
				>
					<span>
						{year.year}
						{(index === 0 || index === years.length - 1) && (
							<span className={styles.era}>{year.era}</span>
						)}
					</span>
				</li>
			))}
		</ul>
	)
}

export default Baseline
