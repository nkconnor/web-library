'use strict';

const React = require('react');
const PropTypes = require('prop-types');
const Spinner = require('./ui/spinner');
const Button = require('./ui/button');
const Icon = require('./ui/icon');
const Modal = require('./ui/modal');
const StyleSelector = require('./style-selector');
const { noop } = require('../utils');
const cx = require('classnames');


class Bibliography extends React.Component {
	handleCancel() {
		this.props.onCancel();
	}

	handleStyleChange() {
		this.props.onStyleChange()
	}

	renderModalContent() {
		const { citations, isUpdating } = this.props;

		return(
			<div className="modal-content" tabIndex={ -1 }>
				<div className="modal-header">
					<h4 className="modal-title text-truncate">
						Bibliography
					</h4>
					<Button
						className="close"
						onClick={ this.handleCancel.bind(this) }
					>
						<Icon type={ '24/remove' } width="24" height="24" />
					</Button>
				</div>
				<div className="modal-body">
					{ isUpdating ? (
						<Spinner />
					) : (
						<React.Fragment>
							<div className="style-selector-container">
								<StyleSelector {...this.props } />
							</div>
							<div className="bibliography read-only"
								dangerouslySetInnerHTML={ { __html: citations } }
							/>
						</React.Fragment>
					) }
				</div>
			</div>
		);
	}

	render() {
		const { isOpen, isReady } = this.props;
		return (
			<Modal
				isOpen={ isOpen }
				contentLabel="Bibliography"
				className={ cx('modal-lg', { loading: !isReady })}
				onRequestClose={ this.handleCancel.bind(this) }
			>
				{ this.renderModalContent() }
			</Modal>
		);
	}

	static propTypes = {
		isOpen: PropTypes.bool,
		isReady: PropTypes.bool,
		onCancel: PropTypes.func,
	}

	static defaultProps = {
		onCancel: noop
	}
}


module.exports = Bibliography;
