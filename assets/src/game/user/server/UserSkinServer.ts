import UtilEvent from "../../Util/UtilEvent";
import UserSignals from "../signals/UserSignals";
import CCLocalStorage from "../../Util/CCLocalStorage/CCLocalStorage";

const USERINFO = "userInfo";

export default class UserSkinServer {

    private static _instance: UserSkinServer;

    public static get instance():UserSkinServer{
        if(!this._instance){
            this._instance = new UserSkinServer();
        }
        return this._instance;
    }

    public init(){
        this.getSaveLocal();
        this.addEventList();
    }

    private addEventList()
    {
        UtilEvent.on(UserSignals.MODIFY_SKI_ALL,this.onModifyAll,this);
        UtilEvent.on(UserSignals.SAVE_USER_INFO,this.onSaveUser,this);
    }

    /**
     * 修改皮肤
     */
    private onModifyAll(skin:UserInfoType) {
        this.skin = skin;
        this.onSaveLocal();
    }

    /**
     * 保存用户数据
     */
    private onSaveUser() {
        this.onSaveLocal();
    }

    private skin:UserInfoType = {
        root:"",
        arms: "",
        name: "",
    };

    /**
     * 获取皮肤
     */
    public getSkin() {
        return this.skin;
    }

    private onSaveLocal(){
        CCLocalStorage.instance.localStorage(USERINFO,JSON.stringify(this.skin));
    }

    private getSaveLocal(){
        let info = CCLocalStorage.instance.getLocalStorage(USERINFO);
        if(info){
            this.skin = JSON.parse(info);
        }
    }





}