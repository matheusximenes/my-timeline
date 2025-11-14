import Dexie, { Table } from 'dexie'

export enum Labels {
	GENESIS = 'genesis',
	CHARACTERS = 'characters',
	JW_EVENTS = 'jw events',
	BIBLES = 'bibles',
	PROPHESIES = 'prophesies',
	CHRIST_PROPHESIES = 'Christ prophesies',
	JESUS = 'jesus',
	BIBLE_EVENTS = 'bible events'
}

export enum Era {
	BCE = 'BCE',
	CE = 'CE'
}

export enum Type {
	ACCURATE = 'accurate',
	INACCURATE = 'inaccurate'
}

export enum BibleBook {
	// Old Testament
	GENESIS = 'genesis',
	EXODUS = 'exodus',
	LEVITICUS = 'leviticus',
	NUMBERS = 'numbers',
	DEUTERONOMY = 'deuteronomy',
	JOSHUA = 'joshua',
	JUDGES = 'judges',
	RUTH = 'ruth',
	FIRST_SAMUEL = '1 samuel',
	SECOND_SAMUEL = '2 samuel',
	FIRST_KINGS = '1 kings',
	SECOND_KINGS = '2 kings',
	FIRST_CHRONICLES = '1 chronicles',
	SECOND_CHRONICLES = '2 chronicles',
	EZRA = 'ezra',
	NEHEMIAH = 'nehemiah',
	ESTHER = 'esther',
	JOB = 'job',
	PSALMS = 'psalms',
	PROVERBS = 'proverbs',
	ECCLESIASTES = 'ecclesiastes',
	SONG_OF_SOLOMON = 'song of solomon',
	ISAIAH = 'isaiah',
	JEREMIAH = 'jeremiah',
	LAMENTATIONS = 'lamentations',
	EZEKIEL = 'ezekiel',
	DANIEL = 'daniel',
	HOSEA = 'hosea',
	JOEL = 'joel',
	AMOS = 'amos',
	OBADIAH = 'obadiah',
	JONAH = 'jonah',
	MICAH = 'micah',
	NAHUM = 'nahum',
	HABAKKUK = 'habakkuk',
	ZEPHANIAH = 'zephaniah',
	HAGGAI = 'haggai',
	ZECHARIAH = 'zechariah',
	MALACHI = 'malachi',

	// New Testament
	MATTHEW = 'matthew',
	MARK = 'mark',
	LUKE = 'luke',
	JOHN = 'john',
	ACTS = 'acts',
	ROMANS = 'romans',
	FIRST_CORINTHIANS = '1 corinthians',
	SECOND_CORINTHIANS = '2 corinthians',
	GALATIANS = 'galatians',
	EPHESIANS = 'ephesians',
	PHILIPPIANS = 'philippians',
	COLOSSIANS = 'colossians',
	FIRST_THESSALONIANS = '1 thessalonians',
	SECOND_THESSALONIANS = '2 thessalonians',
	FIRST_TIMOTHY = '1 timothy',
	SECOND_TIMOTHY = '2 timothy',
	TITUS = 'titus',
	PHILEMON = 'philemon',
	HEBREWS = 'hebrews',
	JAMES = 'james',
	FIRST_PETER = '1 peter',
	SECOND_PETER = '2 peter',
	FIRST_JOHN = '1 john',
	SECOND_JOHN = '2 john',
	THIRD_JOHN = '3 john',
	JUDE = 'jude',
	REVELATION = 'revelation'
}

export interface ITimelineEvent {
	id?: number
	order: number
	title: string
	description: string
	startYear: number
	startType: Type
	startEra: Era
	endYear: number
	endType: Type
	endEra: Era
	customBgColor?: string
	customColor?: string
	customLineColor?: string
	customLineType?: string
	mainImgUrl?: string
	mainImgName?: string
	mainLinkUrl?: string
	mainLinkName?: string
	isLandmark?: boolean
	mapName?: string
	mapLinkUrl?: string
	notes?: string
	labels?: string[]
}

export interface ILabels {
	id?: number
	name: string
	defaultColor: string
}
export class DB extends Dexie {
	timeline!: Table<ITimelineEvent>
	labels!: Table<ILabels>
	constructor() {
		super('CustomTimelineDB')
		this.version(1).stores({
			timeline:
				'++id, order, title, description, startYear, startType, startEra, endYear, endType, endEra, customBgColor, customColor, customLineColor, customLineType, mainImgUrl, mainImgName, mainLinkUrl, mainLinkName, isLandmark, labels, mapName, mapLinkUrl, notes',
			labels: '++id, name, defaultColor'
		})
	}
}
export const db = new DB() // export the db
