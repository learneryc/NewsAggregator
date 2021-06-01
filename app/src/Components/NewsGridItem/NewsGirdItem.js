import React from "react";
import './NewsGridItem.css'
import ShareButton from "../ShareButton/ShareButton";
import {MdDelete} from "react-icons/all";
import ItemTag from "../ItemTag/ItemTag";

class NewsGirdItem extends React.Component {

    handleItemClick() {
        window.location.href = `#/article?id=${this.props.item.id}`;
        this.props.onItemClick('details', this.props.item);
    }

    handleItemRemove() {
        this.props.onItemRemove(this.props.item);
    }

    render() {
        const item = this.props.item;
        const deleteButton = this.props.onItemRemove===undefined? null:
            <MdDelete className='item-delete-button' size={20} color='#b94646'
                      onClick={()=>this.handleItemRemove()}/>;
        return (
            <div className="news-item gird-item">
                <p className="grid-item-title italic">
                    {item.title}
                    <ShareButton item={item}/>
                    {deleteButton}
                </p>
                <img src={item.image} alt='missing'
                     className="item-image" onClick={()=>this.handleItemClick()} />
                <div>
                    <span className="grid-item-date italic">{item.date}</span>
                    <span className="to-right">
                        <ItemTag section={item.section} />
                        <ItemTag section={item.source.toUpperCase()}/>
                    </span>
                </div>
                <div className='clearFloat'></div>


            </div>
        );
    }
};

export default NewsGirdItem;
