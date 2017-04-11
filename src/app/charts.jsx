// React library
import React from 'react';

// Material library
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Paper from 'material-ui/Paper';

// Material icons
import AddCircleIcon from 'material-ui/svg-icons/content/add-circle';

const styles = {
    gridList: {
        width: '98%',
        padding: '1%',
        height: 400,
        overflow: 'auto',
    },
    paper: {
        width: '100%',
        height: '100%',
    }
};

const tilesData = [
    {
        name: 'Pushups',
    },
    {
        name: 'Situps',
    },
    {
        name: 'Minutes reading',
    },
    {
        name: 'Books read',
    },
    {
        name: 'Flossing',
    },
];

/**
 * A simple example of a scrollable `GridList` containing a [Subheader](/#/components/subheader).
 */
export default class Charts extends React.Component {
    render () {
        return (
            <GridList
                cellHeight={180}
                style={styles.gridList}
            >
                {tilesData.map((tile) => (
                    <GridTile
                        title={tile.name}
                        actionIcon={<IconButton><AddCircleIcon /></IconButton>}
                    >
                        <Paper style={styles.paper} zDepth={1} />
                    </GridTile>
                ))}
            </GridList>
        )
    }
}