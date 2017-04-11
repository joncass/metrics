// React library
import React from 'react';

// Material library
import Divider from 'material-ui/Divider';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';

// Material icons
import AddCircleIcon from 'material-ui/svg-icons/content/add-circle';

export default class AddMenu extends React.Component {
    constructor(props) {
        super(props);
        this.handleSelect = this.handleSelect.bind(this);
    }

    handleSelect() {
        alert('selected!');
    }

    render() {
        return (
            <IconMenu
                iconButtonElement={
                    <IconButton touch={true}>
                        <AddCircleIcon />
                    </IconButton>
                }
                >
                <MenuItem primaryText="Add entry" onClick={this.handleSelect} />
                <MenuItem primaryText="Add habit" onClick={this.handleSelect} />
                <Divider />
                <MenuItem primaryText="Add metric" onClick={this.handleSelect} />
            </IconMenu>
        );
    }
}