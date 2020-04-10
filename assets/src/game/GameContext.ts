//==================================================================================
/**
 * 数据上下文
 */
//==================================================================================

import InitInfoCommand from "./dataServer/commands/InitInfoCommand";
import ArchivesServer from "./archives/server/ArchivesServer";
import GameInfoServer from "./dataServer/server/GameInfoServer";
import UserSkinServer from "./user/server/UserSkinServer";
import VoiceUtilModle from "./voice/modle/VoiceUtilModle";
import VBTipsModle from "./tips/modle/VBTipsModle";
import { DataEvents } from "./dataServer/event/DataEvents";
import UtilEvent from "./Util/UtilEvent";


export default class GameContext {

    private static _instance: GameContext;

    public static get instance():GameContext{
        if(!this._instance){
            this._instance = new GameContext();
        }
        return this._instance; 
    }

    /**
     * 初始化流程
     */
    public initProcess()
    {
        Promise.resolve().then(()=>{
            //其他的一些初始化
            let init = new InitInfoCommand();
            return init.initData(); 
        }).then(()=>{
            //存档
            ArchivesServer.instance.initInfo();
            return Promise.resolve();
        }).then(()=>{
            //数据集合
            GameInfoServer.instance.init();
            return Promise.resolve();
        }).then(()=>{
            //用户角色数据
            UserSkinServer.instance.init();
            return Promise.resolve();
        }).then(()=>{
            //音频
            VoiceUtilModle.instance.init();
            return Promise.resolve();
        }).then(()=>{
            //提示框
            VBTipsModle.instance.init();
            return Promise.resolve();
        }).then(()=>{
            //dataServer加载完成
            UtilEvent.dispatch(DataEvents.DATA_SERVER_CONTEXT_END);
            return Promise.resolve();
        })
    }




}
