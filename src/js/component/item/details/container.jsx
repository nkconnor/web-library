'use strict';

import React from 'react';

import ItemDetails from '../details';
import ItemBox from '../box/container';
import { connect } from 'react-redux';
import { itemProp } from '../../../constants';

class ItemDetailsContainer extends React.Component {
	render() {
		return <ItemDetails
			injectItemBox = { ItemBox }
			fields = { this.props.fields }
			item = { this.props.item }
		/>;
	}
}

const mapStateToProps = state => {
	var items, item;
	let selectedCollectionKey = 'collection' in state.router.params ? state.router.params.collection : null;
	let selectedItemKey = 'item' in state.router.params ? state.router.params.item : null;

	if(selectedCollectionKey && state.items[selectedCollectionKey]) {
		items = state.items[selectedCollectionKey].items;
	}

	if(items && selectedItemKey) {
		item = items.find(i => i.key === selectedItemKey);
	}

	return {
		item: item || undefined
	};
};

const mapDispatchToProps = dispatch => {
	return {
		dispatch
	};
};

ItemDetailsContainer.propTypes = {
	fields: React.PropTypes.array,
	item: itemProp
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ItemDetailsContainer);