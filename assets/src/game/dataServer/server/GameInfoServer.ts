import UtilEvent from "../../Util/UtilEvent";
import { DataEvents } from "../event/DataEvents";
import PeopleStateType, { PeopleStateArrType } from "../../process/interface/type/PeopleStateType";
import { ComTipsStr } from "../../common/ComTipsStr";
import CCLocalStorage from "../../Util/CCLocalStorage/CCLocalStorage";


const peopleStateInfo = "peopleStateInfo";


export default class GameInfoServer {

    private static _instance: GameInfoServer;

    public static get instance():GameInfoServer{
        if(!this._instance){
            this._instance = new GameInfoServer();
        }
        return this._instance;
    }

    //背景音量
    private bgmVolume = 0.5;

    //对话音量
    private talkVolume = 0.5;

    //当前在活动的章节
    private chapterId = 1;

    public init(){
        this.addEventList();
    }

    private addEventList()
    {
        UtilEvent.on(DataEvents.MODIFY_BGM_VOLUME,this.onModifyBgm,this);
        UtilEvent.on(DataEvents.MODIFY_CHAPTER_ID,this.onChpaterId,this);
        UtilEvent.on(DataEvents.UP_PEOPLE_STATE,this.upPeopleState,this);
        UtilEvent.on(DataEvents.MODIFY_TALK_VOLUME,this.onTalkBgm,this);
    }

    private removeEventList() {
        UtilEvent.off(DataEvents.MODIFY_BGM_VOLUME,this.onModifyBgm,this);
        UtilEvent.off(DataEvents.MODIFY_CHAPTER_ID,this.onChpaterId,this);
        UtilEvent.off(DataEvents.UP_PEOPLE_STATE,this.upPeopleState,this);
        UtilEvent.off(DataEvents.MODIFY_TALK_VOLUME,this.onTalkBgm,this);
    }

    private onModifyBgm(volume:number) {
        this.bgmVolume = volume;
    }

    private onTalkBgm(volume:number) {
        this.talkVolume = volume; 
    }

    private onChpaterId(chapterId:number) {
        this.chapterId = chapterId;
        UtilEvent.dispatch(DataEvents.UP_CHAPTER_STATE);
    }

    public getBgmVolume(){
        return this.bgmVolume;
    }

    public getTalkVolume(){
        return this.talkVolume;
    }

    public getChapterId(){
        return this.chapterId;
    }


    //==============================================      人物状态     =======================================================

    //人物状态值
    private peopleStateArr:Array<PeopleStateType> = [];

    //当前所有已经添加过的id
    private peopleArr:PeopleStateArrType = new PeopleStateArrType(); 

    //当前所有已经添加过的id
    private userInfo:PeopleStateArrType; 


   /**
    * 修改人物状态值
    */
   private upPeopleState(peopleState:PeopleStateType) {
       let isHave = false;
        for(let i = 0; i < this.peopleStateArr.length; ++i)
        {
            if(this.peopleStateArr[i].people == peopleState.people)
            {
                isHave = true;
                if(this.peopleArr.idArr.indexOf(peopleState.id) >= 0)
                {
                    cc.log(ComTipsStr.str5 + peopleState.id);
                    break;
                }
                this.peopleStateArr[i].reasonNum += Number(peopleState.reasonNum);
                this.peopleStateArr[i].LoveNum += Number(peopleState.LoveNum);
                this.peopleArr.idArr.push(peopleState.id);
                break;
            }
        }

        if(!isHave){
            this.peopleStateArr.push(peopleState);
            this.peopleArr.idArr.push(peopleState.id);
        }
        this.peopleArr.peopleStateArr = this.peopleStateArr;
        this.saveLocalStorage();
    }

    //保存到本地
    private saveLocalStorage() {
        CCLocalStorage.instance.localStorage(peopleStateInfo,JSON.stringify(this.peopleArr));
    }

    public getPeopleArr(){
        return this.peopleStateArr;
    }




}