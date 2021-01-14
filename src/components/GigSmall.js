import { Grid, makeStyles, Paper, Popover } from '@material-ui/core';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import mapStateToProps from '../reducers/tools/mapStateToProps';
import { red, green, yellow } from '@material-ui/core/colors';
import Gig from './Gig';
import convertDate from './tools/convertDate';



const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        margin: theme.spacing(3)
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.primary
    },
    ownPaper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        background: green[500]
    },
    emptyPaper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        background: red[500]
    },
    inSelectionPaper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        background: yellow[500]
    }
}));


function GigSmall(props) {
    const [anchorEl, setAnchorEl] = useState(null);

    const classes = useStyles();
    const actGig = props.gigs[props.gigId]

    function shiftColor(availUsersId, selUserId) {
        if (availUsersId.length === 0) {
            return "emptyPaper";}
             else if (selUserId === props.actUser.id) {
                    return "ownPaper";
                } else if (availUsersId.includes(props.actUser.id)) { 
                    return "inSelectionPaper";
                }   
        return "paper";                
        
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
            <Paper className={classes.root} key={props.gigs[props.gigId].id} elevation={3} onClick={handleClick}>
                <Grid container spacing={2} direction="column"  justify="flex-start">
                    <Grid item xs={'auto'}>
                        <Paper className={classes.paper}>{actGig.title} am {convertDate(actGig.start).toLocaleDateString()} um {convertDate(actGig.start).toLocaleTimeString()}</Paper>
                    </Grid>
                    <Grid container spacing={1} direction="row" justify="center">
                        {actGig.shifts.map(shift => (
                            <Grid item xs={'auto'}>
                                <Paper className={classes[shiftColor(shift.availUserId, shift.selUserId)]}>{shift.shiftType}</Paper>
                            </Grid>))
                        }
                    </Grid>
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