'use strict';

const React = require('react');
const PropTypes = require('prop-types');
const { DragSource } = require('react-dnd');
const { getEmptyImage } = require('react-dnd-html5-backend');
const { ITEM } = require('../../../constants/dnd');

const dndSpec = {
	beginDrag: ({ selectedItemKeys, rowData }) => {
		const itemKey = rowData.key;
		const isDraggingSelected = selectedItemKeys.includes(itemKey);
		return { itemKey, selectedItemKeys, rowData, isDraggingSelected };
	},
	endDrag: ({ rowData, selectedItemKeys, onDrag }, monitor) => {
		const itemKey = rowData.key;
		const isDraggingSelected = selectedItemKeys.includes(itemKey);
		const dropResult = monitor.getDropResult();
		if(dropResult) {
			onDrag({
				itemKeys: isDraggingSelected ? selectedItemKeys : [itemKey],
				...dropResult
			});
		}
	}
};

const dndCollect = (connect, monitor) => ({
	connectDragSource: connect.dragSource(),
	connectDragPreview: connect.dragPreview(),
	isDragging: monitor.isDragging(),
});

@DragSource(ITEM, dndSpec, dndCollect)
class Row extends React.PureComponent {
	render() {
		const a11yProps = {};
		const {
			className,
			columns,
			connectDragSource,
			connectDragPreview,
			index,
			isDragging,
			key,
			onRowClick,
			onRowDoubleClick,
			onRowMouseOut,
			onRowMouseOver,
			onRowRightClick,
			rowData,
			selectedItemKeys,
			style,
			text,
		} = this.props;
		if (
			onRowClick ||
			onRowDoubleClick ||
			onRowMouseOut ||
			onRowMouseOver ||
			onRowRightClick
		) {
			a11yProps['aria-label'] = 'row';
			a11yProps.tabIndex = 0;

			if (onRowClick) {
				a11yProps.onClick = event => onRowClick({event, index, rowData});
			}
			if (onRowDoubleClick) {
				a11yProps.onDoubleClick = event =>
				onRowDoubleClick({event, index, rowData});
			}
			if (onRowMouseOut) {
				a11yProps.onMouseOut = event => onRowMouseOut({event, index, rowData});
			}
			if (onRowMouseOver) {
				a11yProps.onMouseOver = event => onRowMouseOver({event, index, rowData});
			}
			if (onRowRightClick) {
				a11yProps.onContextMenu = event =>
				onRowRightClick({event, index, rowData});
			}
		}

		return connectDragSource(
			<div
				{...a11yProps}
				className={className}
				key={ key }
				role="row"
				style={ {
					...style,
					opacity: isDragging ? 0.5 : 1
				} }
			>
				{ columns }
				{ connectDragPreview(getEmptyImage()) }
			</div>
		);
	}
}


module.exports = Row;
