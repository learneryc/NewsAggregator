class NewsStorage {
    static storageKey='news';
    static getItems(){
        const storageItems = localStorage.getItem(this.storageKey);
        const items = storageItems? JSON.parse(storageItems): [];
        return items;
    }

    static addItem(item) {
        if (this.findItem(item)!==-1) return;
        const items = this.getItems();
        items.push(item);
        const storageItems = JSON.stringify(items);
        localStorage.setItem(this.storageKey, storageItems);
    }

    static findItem(item) {
        const items = this.getItems();
        return items.findIndex((i)=>{return i.id===item.id && i.source===item.source;});
    }

    static removeItem(item) {
        const index = this.findItem(item);
        if (index === -1) return;

        const items = this.getItems();
        items.splice(index, 1);
        const storageItems = JSON.stringify(items);
        localStorage.setItem(this.storageKey, storageItems);
    }
};

class SourceStorage{
    static storageKey='source';
    static setSource(source) {
        localStorage.setItem(this.storageKey, source);
    }

    static getSource() {
        const source = localStorage.getItem(this.storageKey);
        return source? source: 'guardian';
    }
};

export {NewsStorage, SourceStorage};
