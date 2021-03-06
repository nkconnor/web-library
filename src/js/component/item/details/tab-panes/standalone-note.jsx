'use strict';

const React = require('react');
const cx = require('classnames');
const RichEditor = require('../../../rich-editor');

class StandaloneNoteTabPane extends React.PureComponent {
	handleChangeNote(note) {
		this.props.onNoteChange(this.props.item.key, note);
	}

	render() {
		return (
			<div className={ cx({
				'tab-pane': true,
				'notes': true,
				'active': this.props.isActive
			}) }>
				<div className="editor">
				<RichEditor
					value={ this.props.item.note }
					onChange={ this.handleChangeNote.bind(this) }
				/>
			</div>
			</div>
		);
	}
}

module.exports = StandaloneNoteTabPane;
