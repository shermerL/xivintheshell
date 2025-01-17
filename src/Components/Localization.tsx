import React from "react";
import { SkillName, BuffType, ResourceType } from "../Game/Common";
import { ContentNode } from "./Common";
import { MdLanguage } from "react-icons/md";
import { getCurrentThemeColors } from "./ColorTheme";
import { getCachedValue, setCachedValue } from "../Controller/Common";
import { controller } from "../Controller/Controller";

export type Language = "en" | "zh" | "ja";
export type LocalizedContent = {
	en: ContentNode;
	zh?: ContentNode;
	ja?: ContentNode;
};

export function localize(content: LocalizedContent) {
	let currentLang = getCurrentLanguage();
	if (currentLang === "zh" && content.zh) {
		return content.zh;
	} else if (currentLang === "ja" && content.ja) {
		return content.ja;
	} else {
		return content.en;
	}
}

// Expect date in format "mm/dd/yy" which is in changelog.
export function localizeDate(date: string, lang: Language): string {
	if (lang === "zh" || lang === "en") return date;

	if (lang === "ja") {
		let [month, day, year] = date.split("/");
		return `20${year}年${month}月${day}日`;
	}

	return date;
}

const skillsZh = new Map<SkillName, string>([
	[SkillName.Fire, "火1"],
	[SkillName.Blizzard, "冰1"],
	[SkillName.Fire2, "火2"],
	[SkillName.Blizzard2, "冰2"],
	[SkillName.Fire4, "火4"],
	[SkillName.Transpose, "星灵移位"],
	[SkillName.Thunder3, "雷3"],
	[SkillName.Manaward, "魔罩"],
	[SkillName.Manafont, "魔泉"],
	[SkillName.Fire3, "火3"],
	[SkillName.Blizzard3, "冰3"],
	[SkillName.Freeze, "玄冰"],
	[SkillName.Flare, "核爆"],
	[SkillName.LeyLines, "黑魔纹"],
	[SkillName.Blizzard4, "冰4"],
	[SkillName.Thunder4, "霹雷"],
	[SkillName.BetweenTheLines, "魔纹步"],
	[SkillName.AetherialManipulation, "以太步"],
	[SkillName.Triplecast, "三连咏唱"],
	[SkillName.Foul, "秽浊"],
	[SkillName.Despair, "绝望"],
	[SkillName.UmbralSoul, "灵极魂"],
	[SkillName.Xenoglossy, "异言"],
	[SkillName.HighFire2, "高火2"],
	[SkillName.HighBlizzard2, "高冰冻2"],
	[SkillName.Amplifier, "详述"],
	[SkillName.Addle, "病毒"],
	[SkillName.Swiftcast, "即刻咏唱"],
	[SkillName.LucidDreaming, "醒梦"],
	[SkillName.Surecast, "沉稳咏唱"],
	[SkillName.Tincture, "爆发药"],
	[SkillName.Paradox, "悖论"],
	[SkillName.HighThunder, "高闪雷"],
	[SkillName.HighThunder2, "高震雷"],
	[SkillName.Sprint, "疾跑"],
	[SkillName.Retrace, "魔纹重置"],
	[SkillName.FlareStar, "耀星"],

	// picto stuff
	[SkillName.FireInRed, "火炎之红"],
	[SkillName.AeroInGreen, "疾风之绿"],
	[SkillName.WaterInBlue, "流水之蓝"],
	[SkillName.Fire2InRed, "烈炎之红"],
	[SkillName.Aero2InGreen, "烈风之绿"],
	[SkillName.Water2InBlue, "激水之蓝"],
	[SkillName.BlizzardInCyan, "冰结之蓝青"],
	[SkillName.StoneInYellow, "飞石之纯黄"],
	[SkillName.ThunderInMagenta, "闪雷之品红"],
	[SkillName.Blizzard2InCyan, "冰冻之蓝青"],
	[SkillName.Stone2InYellow, "坚石之纯黄"],
	[SkillName.Thunder2InMagenta, "震雷之品红"],
	[SkillName.HolyInWhite, "神圣之白"],
	[SkillName.CometInBlack, "彗星之黑"],
	[SkillName.RainbowDrip, "彩虹点滴"],
	[SkillName.StarPrism, "天星棱光"],

	[SkillName.TemperaCoat, "坦培拉涂层"],
	[SkillName.TemperaGrassa, "油性坦培拉涂层"],
	[SkillName.TemperaCoatPop, "坦培拉涂层破盾"],
	[SkillName.TemperaGrassaPop, "油性坦培拉涂层破盾"],
	[SkillName.Smudge, "速涂"],
	[SkillName.SubtractivePalette, "减色混合"],

	[SkillName.CreatureMotif, "动物彩绘"],
	[SkillName.PomMotif, "绒球彩绘"],
	[SkillName.WingMotif, "翅膀彩绘"],
	[SkillName.ClawMotif, "兽爪彩绘"],
	[SkillName.MawMotif, "尖牙彩绘"],
	[SkillName.LivingMuse, "动物构想"],
	[SkillName.PomMuse, "绒球构想"],
	[SkillName.WingedMuse, "翅膀构想"],
	[SkillName.ClawedMuse, "兽爪构想"],
	[SkillName.FangedMuse, "尖牙构想"],
	[SkillName.MogOfTheAges, "莫古力激流"],
	[SkillName.RetributionOfTheMadeen, "马蒂恩惩罚"],

	[SkillName.WeaponMotif, "武器彩绘"],
	[SkillName.SteelMuse, "武器构想"],
	[SkillName.HammerMotif, "重锤彩绘"],
	[SkillName.StrikingMuse, "重锤构想"],
	[SkillName.HammerStamp, "重锤敲章"],
	[SkillName.HammerBrush, "重锤掠刷"],
	[SkillName.PolishingHammer, "重锤抛光"],

	[SkillName.LandscapeMotif, "风景彩绘"],
	[SkillName.ScenicMuse, "风景构想"],
	[SkillName.StarrySkyMotif, "星空彩绘"],
	[SkillName.StarryMuse, "星空构想"],

	// RDM stuff
	[SkillName.Riposte, "回刺"],
	[SkillName.Verthunder, "赤闪雷"],
	[SkillName.CorpsACorps, "短兵相接"],
	[SkillName.Veraero, "赤疾风"],
	[SkillName.Verfire, "赤火炎"],
	[SkillName.Verstone, "赤飞石"],
	[SkillName.Zwerchhau, "交击斩"],
	[SkillName.Displacement, "移转"],
	[SkillName.Fleche, "飞刺"],
	[SkillName.Redoublement, "连攻"],
	[SkillName.Acceleration, "促进"],
	[SkillName.Moulinet, "划圆斩"],
	[SkillName.Vercure, "赤治疗"],
	[SkillName.ContreSixte, "六分反击"],
	[SkillName.Embolden, "鼓励"],
	[SkillName.Manafication, "魔元化"],
	[SkillName.Jolt2, "震荡"],
	[SkillName.Verraise, "赤复活"],
	[SkillName.Impact, "冲击"],
	[SkillName.Verflare, "赤核爆"],
	[SkillName.Verholy, "赤神圣"],
	[SkillName.EnchantedRiposte, "魔回刺"],
	[SkillName.EnchantedZwerchhau, "魔交击斩"],
	[SkillName.EnchantedRedoublement, "魔连攻"],
	[SkillName.EnchantedMoulinet, "魔划圆斩"],
	[SkillName.Verthunder2, "赤震雷"],
	[SkillName.Veraero2, "赤烈风"],
	[SkillName.Engagement, "交剑"],
	[SkillName.EnchantedReprise, "魔续斩"],
	[SkillName.Reprise, "续斩"],
	[SkillName.Scorch, "焦热"],
	[SkillName.Verthunder3, "赤暴雷"],
	[SkillName.Veraero3, "赤疾风"],
	[SkillName.MagickBarrier, "抗死"],
	[SkillName.Resolution, "决断"],
	[SkillName.EnchantedMoulinet2, "魔划圆斩·二段"],
	[SkillName.EnchantedMoulinet3, "魔划圆斩·三段"],
	[SkillName.Jolt3, "激荡"],
	[SkillName.ViceOfThorns, "荆棘回环"],
	[SkillName.GrandImpact, "显贵冲击"],
	[SkillName.Prefulgence, "光芒四射"],
	//等到绝伊甸我一定把你们全都秒了！————不知名赤魔法师
]);

const skillsJa = new Map<SkillName, string>([
	[SkillName.Fire, "ファイア"],
	[SkillName.Blizzard, "ブリザド"],
	[SkillName.Fire2, "ファイラ"],
	[SkillName.Blizzard2, "ブリザラ"],
	[SkillName.Fire4, "ファイジャ"],
	[SkillName.Transpose, "トランス"],
	[SkillName.Thunder3, "サンダガ"],
	[SkillName.Manaward, "マバリア"],
	[SkillName.Manafont, "マナフォント"],
	[SkillName.Fire3, "ファイガ"],
	[SkillName.Blizzard3, "ブリザガ"],
	[SkillName.Freeze, "フリーズ"],
	[SkillName.Flare, "フレア"],
	[SkillName.LeyLines, "黒魔紋"],
	[SkillName.Blizzard4, "ブリザジャ"],
	[SkillName.BetweenTheLines, "ラインズステップ"],
	[SkillName.AetherialManipulation, "エーテリアルテップ"],
	[SkillName.Triplecast, "三連魔"],
	[SkillName.Foul, "ファウル"],
	[SkillName.Despair, "デスペア"],
	[SkillName.UmbralSoul, "アンブラルソウル"],
	[SkillName.Xenoglossy, "ゼノグロシー"],
	[SkillName.HighFire2, "ハイファイラ"],
	[SkillName.HighBlizzard2, "ハイブリザラ"],
	[SkillName.Amplifier, "アンプリファイア"],
	[SkillName.Addle, "アドル"],
	[SkillName.Swiftcast, "迅速魔"],
	[SkillName.LucidDreaming, "ルーシッドドリーム"],
	[SkillName.Surecast, "堅実魔"],
	[SkillName.Tincture, "薬"],
	[SkillName.Paradox, "パラドックス"],
	[SkillName.HighThunder, "ハイサンダー"],
	[SkillName.Sprint, "スプリント"],
	[SkillName.Retrace, "魔紋再設置"],
	[SkillName.FlareStar, "フレアスター"],

	// picto localization
	[SkillName.FireInRed, "レッドファイア"],
	[SkillName.AeroInGreen, "グリーンエアロ"],
	[SkillName.WaterInBlue, "ブルーウォータ"],
	[SkillName.Fire2InRed, "レッドファイラ"],
	[SkillName.Aero2InGreen, "グリーンエアロラ"],
	[SkillName.Water2InBlue, "ブルーウォタラ"],
	[SkillName.BlizzardInCyan, "シアンブリザド"],
	[SkillName.StoneInYellow, "イエローストーン"],
	[SkillName.ThunderInMagenta, "マゼンタサンダー"],
	[SkillName.Blizzard2InCyan, "シアンブリザラ"],
	[SkillName.Stone2InYellow, "イエローストンラ"],
	[SkillName.Thunder2InMagenta, "マゼンタサンダラ"],
	[SkillName.HolyInWhite, "ホワイトホーリー"],
	[SkillName.CometInBlack, "ブラックコメット"],
	[SkillName.RainbowDrip, "レインボードリップ"],
	[SkillName.StarPrism, "スタープリズム"],

	[SkillName.TemperaCoat, "テンペラコート"],
	[SkillName.TemperaGrassa, "テンペラグラッサ"],
	[SkillName.TemperaCoatPop, "テンペラコート【ブレイク】"],
	[SkillName.TemperaGrassaPop, "テンペラグラッサ【ブレイク】"],
	[SkillName.Smudge, "スマッジ"],
	[SkillName.SubtractivePalette, "サブトラクティブパレット"],

	[SkillName.CreatureMotif, "ピクトアニマル"],
	[SkillName.PomMotif, "ピクトアニマル"],
	[SkillName.WingMotif, "ピクトスケープ"],
	[SkillName.ClawMotif, "ピクトクロー"],
	[SkillName.MawMotif, "ピクトファング"],
	[SkillName.LivingMuse, "イマジンアニマル"],
	[SkillName.PomMuse, "ピクトポンポン"],
	[SkillName.WingedMuse, "ピクトウィング"],
	[SkillName.ClawedMuse, "イマジンクロー"],
	[SkillName.FangedMuse, "イマジンファング"],
	[SkillName.MogOfTheAges, "モーグリストリーム"],
	[SkillName.RetributionOfTheMadeen, "マディーンレトリビューション"],

	[SkillName.WeaponMotif, "ピクトウェポン"],
	[SkillName.SteelMuse, "イマジンウェポン"],
	[SkillName.HammerMotif, "ピクトハンマー"],
	[SkillName.StrikingMuse, "イマジンハンマー"],
	[SkillName.HammerStamp, "ハンマースタンプ"],
	[SkillName.HammerBrush, "ハンマーブラッシュ"],
	[SkillName.PolishingHammer, "ハンマーポリッシュ"],

	[SkillName.LandscapeMotif, "ピクトスケープ"],
	[SkillName.ScenicMuse, "イマジンスケープ"],
	[SkillName.StarrySkyMotif, "ピクトスカイ"],
	[SkillName.StarryMuse, "イマジンスカイ"],
	// TODO rdm localization
]);

export function localizeSkillName(text: SkillName): string {
	let currentLang = getCurrentLanguage();
	if (currentLang === "zh") {
		return skillsZh.get(text) ?? text;
	} else if (currentLang === "ja") {
		return skillsJa.get(text) ?? text;
	} else {
		return text;
	}
}

const buffsZh = new Map<BuffType, string>([
	[BuffType.LeyLines, "黑魔纹"],
	[BuffType.Hyperphantasia, "绘灵幻景"],
	[BuffType.Tincture, "爆发药"],

	[BuffType.ArcaneCircle, "神秘纹"],
	[BuffType.ArmysPaeon, "军神的赞美歌歌"],
	[BuffType.BattleLitany, "战斗连祷"],
	[BuffType.BattleVoice, "战斗之声"],
	[BuffType.Brotherhood, "义结金兰"],
	[BuffType.Card_TheBalance, "太阳神之衡"],
	[BuffType.Card_TheSpear, "战斗神之枪"],
	[BuffType.ChainStratagem, "连环计"],
	[BuffType.Devilment, "进攻之探戈"],
	[BuffType.Divination, "占卜"],
	[BuffType.Dokumori, "介毒之术"],
	[BuffType.Embolden, "鼓励"],
	[BuffType.MagesBallad, "贤者的叙事谣"],
	[BuffType.RadiantFinale1, "光明神的最终乐章1"],
	[BuffType.RadiantFinale2, "光明神的最终乐章2"],
	[BuffType.RadiantFinale3, "光明神的最终乐章3"],
	[BuffType.SearingLight, "灼热之光"],
	[BuffType.StandardFinish, "标准舞步结束"],
	[BuffType.StarryMuse, "星空构想"],
	[BuffType.TechnicalFinish, "技巧舞步结束"],
	[BuffType.WanderersMinuet, "放浪神的小步舞曲"],
]);

const buffsJa = new Map<BuffType, string>([
	[BuffType.LeyLines, "黒魔紋"],
	[BuffType.Tincture, "薬"],

	[BuffType.ArcaneCircle, "アルケインサークル"],
	[BuffType.ArmysPaeon, "軍神のパイオン"],
	[BuffType.BattleLitany, "バトルリタニー"],
	[BuffType.BattleVoice, "バトルボイス"],
	[BuffType.Brotherhood, "桃園結義"],
	[BuffType.Card_TheBalance, "アーゼマの均衡"],
	[BuffType.Card_TheSpear, "ハルオーネの槍"],
	[BuffType.ChainStratagem, "連環計"],
	[BuffType.Devilment, "攻めのタンゴ"],
	[BuffType.Divination, "ディヴィネーション"],
	[BuffType.Dokumori, "毒盛の術"],
	[BuffType.Embolden, "エンボルデン"],
	[BuffType.MagesBallad, "賢人のバラード"],
	[BuffType.RadiantFinale1, "光神のフィナーレ1"],
	[BuffType.RadiantFinale2, "光神のフィナーレ2"],
	[BuffType.RadiantFinale3, "光神のフィナーレ3"],
	[BuffType.SearingLight, "シアリングライト"],
	[BuffType.StandardFinish, "スタンダードフィニッシュ"],
	[BuffType.StarryMuse, "イマジンスカイ"],
	[BuffType.TechnicalFinish, "テクニカルフィニッシュ"],
	[BuffType.WanderersMinuet, "旅神のメヌエット"],
]);

export function localizeBuffType(text: BuffType): string {
	let currentLang = getCurrentLanguage();
	if (currentLang === "zh") {
		return buffsZh.get(text) ?? text;
	} else if (currentLang === "ja") {
		return buffsJa.get(text) ?? text;
	} else {
		return text;
	}
}

const resourcesZh = new Map<ResourceType, string>([
	// common
	[ResourceType.Mana, "MP"],
	[ResourceType.Tincture, "爆发药"],
	[ResourceType.Sprint, "疾跑"],
	[ResourceType.RearPositional, "身位加成（后）"],
	[ResourceType.FlankPositional, "身位加成（侧）"],
	[ResourceType.Addle, "昏乱"],
	[ResourceType.Swiftcast, "即刻咏唱"],
	[ResourceType.LucidDreaming, "醒梦"],
	[ResourceType.Surecast, "沉稳咏唱"],
	[ResourceType.InCombat, "战斗中"],
	[ResourceType.cd_GCD, "GCD"],

	// BLM
	[ResourceType.Triplecast, "三重咏唱"],
	[ResourceType.Firestarter, "火苗"],
	[ResourceType.Thunderhead, "雷砧"],
	[ResourceType.HighThunder, "高闪雷"], // May need retranslation from ThunderDoT
	[ResourceType.ThunderIII, "暴雷"], // May need retranslation from ThunderDoT
	[ResourceType.HighThunderII, "高震雷"], // May need retranslation from ThunderDoT
	[ResourceType.ThunderIV, "霹雷"], // May need retranslation from ThunderDoT
	[ResourceType.LeyLines, "黑魔纹"],
	[ResourceType.Manaward, "魔纹罩"],
	[ResourceType.AstralFire, "星极火"],
	[ResourceType.UmbralIce, "灵极冰"],
	[ResourceType.UmbralHeart, "冰针"],
	[ResourceType.AstralSoul, "星极魂"],
	[ResourceType.Paradox, "悖论"],
	[ResourceType.Enochian, "天语"],
	[ResourceType.Polyglot, "通晓"],

	// PCT
	[ResourceType.Aetherhues, "以太色调"],
	[ResourceType.TemperaCoat, "坦培拉涂层"],
	[ResourceType.Smudge, "速涂"],
	[ResourceType.HammerTime, "重锤连击"],
	[ResourceType.SubtractivePalette, "减色混合"],
	[ResourceType.StarryMuse, "星空构想"],
	[ResourceType.SubtractiveSpectrum, "减色混合预备"],
	[ResourceType.Hyperphantasia, "绘灵幻景"],
	[ResourceType.Inspiration, "绘画装置"],
	[ResourceType.RainbowBright, "彩虹点滴效果提高"],
	[ResourceType.Starstruck, "天星棱光预备"],
	[ResourceType.TemperaGrassa, "油性坦培拉涂层"],
	[ResourceType.MonochromeTones, "色调反转"],
	[ResourceType.HammerCombo, "重锤连击数"],
	[ResourceType.cd_Subtractive, "CD：减色混合"],
	[ResourceType.cd_Grassa, "CD：油性坦培拉涂层"],

	// RDM
	[ResourceType.WhiteMana, "白魔元"],
	[ResourceType.BlackMana, "黑魔元"],
	[ResourceType.ManaStacks, "魔元集"],
	[ResourceType.Acceleration, "促进"],
	[ResourceType.Dualcast, "连续咏唱"],
	[ResourceType.Embolden, "鼓励"],
	[ResourceType.GrandImpactReady, "显贵冲击预备"],
	[ResourceType.MagickBarrier, "抗死"],
	[ResourceType.MagickedSwordplay, "魔法剑术"],
	[ResourceType.Manafication, "魔元化"],
	[ResourceType.PrefulgenceReady, "光芒四射预备"],
	[ResourceType.ThornedFlourish, "荆棘环绕预备"],
	[ResourceType.VerfireReady, "赤火炎预备"],
	[ResourceType.VerstoneReady, "赤飞石预备"],
	[ResourceType.RDMMeleeCounter, "赤魔近战连"],
	[ResourceType.RDMAoECounter, "赤魔AOE连"],
]);

export function localizeResourceType(text: ResourceType): string {
	const currentLang = getCurrentLanguage();
	if (currentLang === "zh") {
		if (resourcesZh.has(text)) {
			return resourcesZh.get(text)!;
		}
		if (text.startsWith("cd_")) {
			const sliced = text.slice(3) as keyof typeof SkillName;
			const skillName: SkillName | undefined = SkillName[sliced];
			if (skillName !== undefined) {
				return "CD：" + localizeSkillName(skillName);
			}
		}
		return text;
	} else {
		return text;
	}
}

export let getCurrentLanguage: () => Language = () => {
	return "en";
};
let setCurrentLanguage: (lang: Language) => void = (lang) => {};

function LanguageOption(props: { lang: Language }) {
	let text = "English";
	if (props.lang === "zh") text = "中文";
	if (props.lang === "ja") text = "日本語";
	let colors = getCurrentThemeColors();
	return <div
		style={{
			display: "inline-block",
			cursor: "pointer",
			verticalAlign: "middle",
			textDecoration: props.lang === getCurrentLanguage() ? "none" : "underline",
			borderTop: props.lang === getCurrentLanguage() ? "1px solid " + colors.text : "none",
		}}
		onClick={() => {
			setCurrentLanguage(props.lang);
		}}
	>
		{text}
	</div>;
}

export class SelectLanguage extends React.Component {
	state: {
		lang: Language;
	};
	constructor(props: {}) {
		super(props);
		let lang: Language = "en";
		let savedLang = getCachedValue("language");
		if (savedLang === "zh" || savedLang === "ja") lang = savedLang;
		this.state = {
			lang: lang,
		};
	}

	componentDidMount() {
		getCurrentLanguage = () => {
			return this.state.lang;
		};
		setCurrentLanguage = (lang: Language) => {
			this.setState({ lang: lang });
			setCachedValue("language", lang);
		};
	}
	componentDidUpdate(
		prevProps: Readonly<{}>,
		prevState: Readonly<{ lang: Language }>,
		snapshot?: any,
	) {
		if (prevState.lang !== this.state.lang) {
			controller.updateAllDisplay();
		}
	}

	componentWillUnmount() {
		getCurrentLanguage = () => {
			return "en";
		};
		setCurrentLanguage = (lang) => {};
	}

	render() {
		return <div
			style={{
				display: "inline-block",
				position: "absolute",
				right: 68,
			}}
		>
			<span
				style={{
					display: "inline-block",
					fontSize: 17,
					position: "relative",
					marginRight: 2,
				}}
			>
				<MdLanguage />
			</span>
			<div style={{ display: "inline-block", fontSize: 14, position: "relative", top: -4 }}>
				<LanguageOption lang={"en"} />|
				<LanguageOption lang={"zh"} />
			</div>
		</div>;
	}
}
