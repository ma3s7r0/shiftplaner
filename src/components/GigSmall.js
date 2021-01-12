import { Grid, makeStyles, Paper, Popover } from '@material-ui/core';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import mapStateToProps from '../reducers/tools/mapStateToProps';
import { red, green } from '@material-ui/core/colors';
import Gig from './Gig';



const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        margin: theme.spacing(6)
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.primary
    },
    ownpaper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        background: green[500]
    },
    emptypaper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        background: red[500]
    }
}));


function GigSmall(props) {
    const [anchorEl, setAnchorEl] = useState(null);

    const classes = useStyles();
    const actGig = props.gigs[props.gigId]

    function shiftColor(shiftUser) {
        switch (shiftUser) {
            case props.actUser.id:
                return "ownpaper";
            case "":
                return "emptypaper";
            default:
                return "paper";
        }
    }

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <>
            <Paper className={classes.root} key={props.gigs[props.gigId].id} elevation={17} onClick={handleClick}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Paper className={classes.paper}>{actGig.title} am {actGig.start.toLocaleDateString()} um {actGig.start.toLocaleTimeString()}</Paper>
                    </Grid>
                    {actGig.shifts.map(shift => (<Grid item xs={12 / actGig.shifts.length}>
                        <Paper className={classes[shiftColor(shift.userId)]}>{shift.shiftType}</Paper>
                    </Grid>))}
                </Grid>
            </Paper>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                onClickAway={handleClose}
                anchorOrigin={{
                    vertical: 'center',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'center',
                    horizontal: 'center',
                }}
            >
                <Gig gigId={props.gigId} />
            </Popover>
        </>
    );
}

export default connect(mapStateToProps)(GigSmall);