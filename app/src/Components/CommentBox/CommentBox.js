import React from 'react';
import commentBox from 'commentbox.io';

const projectId = '5707771865464832-proj';
class CommentBox extends React.Component {

    componentDidMount() {
        this.removeCommentBox = commentBox(projectId, {defaultBoxId: this.props.id});
    }

    componentWillUnmount() {
        this.removeCommentBox();
    }

    render() {
        return (
            <div className="commentbox" />
        );
    }
}

export default CommentBox;
