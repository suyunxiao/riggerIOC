
/**
 * 存档 和 读档
 */

import ArchivesType from "../modle/ArchivesType";
import UtilEvent from "../../Util/UtilEvent";
import ArchivesEvents from "../event/ArchivesEvents";
import CCLocalStorage from "../../Util/CCLocalStorage/CCLocalStorage";

const PRESER = "archiverPreserArr";
const READ = "archiverReadArr";


export default class ArchivesServer {

    private static _instance: ArchivesServer;

    public static get instance():ArchivesServer{
        if(!this._instance){
            this._instance = new ArchivesServer();
        }
        return this._instance;
    }

    /**
     * 存档数组
     */
    private archiverPreserArr:Array<ArchivesType> = [];
   
    /**
     * 读档数组
     */
    private archiverReadArr:Array<ArchivesType> = [];

    public initInfo()
    {
        let arr = [];
        for(let i = 0; i < 9; ++i)
        {
            let type:ArchivesType = new ArchivesType();
            type.serial = i + 1;
            arr.push(type);
        }
        this.archiverReadArr = arr;
        this.archiverPreserArr = arr;
        this.initEventList();
        this.getSaveLocal();
    }

    private onSaveLocal(){
        CCLocalStorage.instance.localStorage(PRESER,JSON.stringify(this.archiverPreserArr));
        CCLocalStorage.instance.localStorage(READ,JSON.stringify(this.archiverReadArr));
    }

    public getSaveLocal(){
        let info = CCLocalStorage.instance.getLocalStorage(PRESER);
        let info2 = CCLocalStorage.instance.getLocalStorage(READ);
        if(info){
            this.archiverPreserArr = JSON.parse(info);
        }
        if(info2){
            this.archiverReadArr = JSON.parse(info2);
        }
    }

    private initEventList()
    {
        UtilEvent.on(ArchivesEvents.MODIFICATION_PRESER_SIGN,this.onPreser,this);
        UtilEvent.on(ArchivesEvents.MODIFICATION_READ_SIGN,this.onRead,this);
        UtilEvent.on(ArchivesEvents.SAVE_READ_SIGN,this.onSaveLocal,this);
    }

    private removeEventList() {
        UtilEvent.off(ArchivesEvents.MODIFICATION_PRESER_SIGN,this.onPreser,this);
        UtilEvent.off(ArchivesEvents.MODIFICATION_READ_SIGN,this.onRead,this);
        UtilEvent.off(ArchivesEvents.SAVE_READ_SIGN,this.onSaveLocal,this);
    }

    private onPreser(data:ArchivesType | Array<ArchivesType>) {
        let is = data instanceof Array;
        if(is) {
            let arr:Array<ArchivesType> = data as Array<ArchivesType> ;
            for(let i = 0; i < arr.length; ++i)
            {
                for(let j = 0; j < this.archiverPreserArr.length; ++j)
                {
                    if(this.archiverPreserArr[j].serial == arr[i].serial){
                        this.archiverPreserArr[j] = arr[i];
                        break;
                    }
                }
            } 
        } else {
            let info = data as ArchivesType;
            for(let i = 0; i < this.archiverPreserArr.length; ++i)
            {
                if(this.archiverPreserArr[i].serial == info.serial){
                    this.archiverPreserArr[i] = info;
                    break;
                }
            }
        }
        UtilEvent.dispatch(ArchivesEvents.UP_PRESER_SIGN);
        UtilEvent.dispatch(ArchivesEvents.UP_READ_SIGN);
        this.onSaveLocal();
    }

    private onRead(data:ArchivesType | Array<ArchivesType>) {
        
        UtilEvent.dispatch(ArchivesEvents.UP_READ_SIGN);
    }


    /**
     * 获取存档
     */
    public getPreserArr(){
        return this.archiverPreserArr;
    }

    
    /**
     * 获取读档
     */
    public getReadArchiverArr(){
        return this.archiverReadArr;
    }


}