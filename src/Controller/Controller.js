import { addLogContent } from "../Components/LogView";
import {Color, LogCategory} from "./Common";
import { game } from "../Game/GameState";
import {ResourceType} from "../Game/Common";
import {updateStatusDisplay} from "../Components/StatusDisplay";

class Controller
{
    // game --> view
    log(category, content, time, color=Color.Text)
    {
        if (time !== undefined) content = time.toFixed(3) + "s: " + content;
        addLogContent(category, content, color);
    }

    updateStatusDisplay(game) {
        // resources
        let eno = game.resources.get(ResourceType.Enochian);
        let resourcesData = {
            mana: game.resources.get(ResourceType.Mana).currentValue,
            enochianCountdown: game.resources.timeTillReady(ResourceType.Enochian),
            astralFire: game.getFireStacks(),
            umbralIce: game.getIceStacks(),
            umbralHearts: game.resources.get(ResourceType.UmbralHeart).currentValue,
            paradox: game.resources.get(ResourceType.Paradox).currentValue,
            polyglotCountdown: eno.available(1) ? game.resources.timeTillReady(ResourceType.Polyglot) : 30,
            polyglotStacks: game.resources.get(ResourceType.Polyglot).currentValue
        };
        // locks
        let cast = game.resources.get(ResourceType.NotCasterTaxed);
        let anim = game.resources.get(ResourceType.NotAnimationLocked);
        let resourceLocksData = {
            castLocked: game.resources.timeTillReady(ResourceType.NotCasterTaxed) > 0,
            castLockTotalDuration: cast.pendingChange ? cast.pendingChange.delay : 0,
            castLockCountdown: game.resources.timeTillReady(ResourceType.NotCasterTaxed),
            animLocked: game.resources.timeTillReady(ResourceType.NotAnimationLocked) > 0,
            animLockTotalDuration: anim.pendingChange ? anim.pendingChange.delay : 0,
            animLockCountdown: game.resources.timeTillReady(ResourceType.NotAnimationLocked),
            canMove: game.resources.get(ResourceType.Movement).available(1),
        };
        // enemy buffs
        let enemyBuffsData = {
            DoTCountdown: game.resources.timeTillReady(ResourceType.ThunderDoT),
            addleCountdown: game.resources.timeTillReady(ResourceType.Addle)
        };
        // self buffs
        let selfBuffsData = {
            leyLinesCountdown: game.resources.timeTillReady(ResourceType.LeyLines),
            sharpcastCountdown: game.resources.timeTillReady(ResourceType.Sharpcast),
            triplecastCountdown: game.resources.timeTillReady(ResourceType.Triplecast),
            firestarterCountdown: game.resources.timeTillReady(ResourceType.Firestarter),
            thundercloudCountdown: game.resources.timeTillReady(ResourceType.Thundercloud),
            manawardCountdown: game.resources.timeTillReady(ResourceType.Manaward),
            swiftcastCountdown: game.resources.timeTillReady(ResourceType.Swiftcast),
            lucidDreamingCountdown: game.resources.timeTillReady(ResourceType.LucidDreaming),
            surecastCountdown: game.resources.timeTillReady(ResourceType.Surecast),
            tinctureCountdown: game.resources.timeTillReady(ResourceType.Tincture),
        };
        updateStatusDisplay({
            resources: resourcesData,
            resourceLocks: resourceLocksData,
            enemyBuffs: enemyBuffsData,
            selfBuffs: selfBuffsData
        });
    }

    // view --> game
    requestTick(props={ deltaTime: -1 })
    {
        if (props.deltaTime > 0) {
            game.tick(props.deltaTime);
            this.updateStatusDisplay(game);
            this.log(LogCategory.Action, "fast forward " + props.deltaTime.toFixed(3) + "s", game.time, Color.Grey);
        }
    }

    requestPlayPause(props)
    {
        console.log("req play/pause");
    }

    requestFastForward(props)
    {
        let deltaTime = game.timeTillAnySkillAvailable();
        if (deltaTime > 0) {
            game.tick(deltaTime);
            this.updateStatusDisplay(game);
        }
        this.log(LogCategory.Action, "wait for " + deltaTime.toFixed(3) + "s", game.time, Color.Grey);
    }

    requestUseSkill(props)
    {
        game.useSkillIfAvailable(props.skillName);
    }

    getResourceStatus(rscType)
    {
        let rsc = game.resources.get(rscType);
        return [rsc.currentValue, rsc.maxValue];
    }
}
export const controller = new Controller();