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
        id: 0,
        name: 'Pushups',
    },
    {
        id: 1,
        name: 'Situps',
    },
    {
        id: 2,
        name: 'Minutes reading',
    },
    {
        id: 3,
        name: 'Books read',
    },
    {
        id: 4,
        name: 'Flossing',
    },
];

const Charts = () => (
    <GridList
        cellHeight={180}
        style={styles.gridList}
    >
        {tilesData.map((tile) => (
            <GridTile
                title={tile.name}
                actionIcon={<IconButton><AddCircleIcon /></IconButton>}
                key={tile.id}
            >
                <Paper style={styles.paper} zDepth={1} />
            </GridTile>
        ))}
    </GridList>
)

export default Charts;