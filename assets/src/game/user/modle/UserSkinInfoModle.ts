
/**
 * 
 *  角色皮肤模块
 * 
 */

import UserSkinServer from "../server/UserSkinServer";



export default class UserSkinInfoModle {

    private static _instance: UserSkinInfoModle;

    public static get instance():UserSkinInfoModle{
        if(!this._instance){
            this._instance = new UserSkinInfoModle();
        }
        return this._instance;
    }


    /**
     * 获取皮肤数据
     */
    public getSkinInfo():UserInfoType {
        return UserSkinServer.instance.getSkin();
    }

    /**
     * 获取用户是否存在
     */
    public getExistenceInfo() {
        let isExistence = false;
        if(UserSkinServer.instance.getSkin().name != ""){
            isExistence = true;
        }
        return isExistence;
    }

}