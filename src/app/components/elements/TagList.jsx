import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { normalizeTags } from 'app/utils/StateFunctions';
import { ifHive } from 'app/utils/Community';
import DropdownMenu from 'app/components/elements/DropdownMenu';

class TagList extends Component {
    render() {
        const { post, single } = this.props;
        const category = post.get('category');

        const link = tag => {
            const name =
                (ifHive(tag) ? post.get('community_title') : null) || '#' + tag;
            return (
                <Link to={`/trending/${tag}`} key={tag}>
                    {' '}
                    {name}{' '}
                </Link>
            );
        };

        if (single) return link(category);

        return (
            <div className="TagList__horizontal">
                {normalizeTags(post.get('json_metadata'), category).map(link)}
            </div>
        );
    }
}

export default connect(
    // mapStateToProps
    (state, ownProps) => ({
        post: ownProps.post,
        single: ownProps.single,
    })
)(TagList);
