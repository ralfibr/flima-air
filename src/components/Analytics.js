import React from 'react'
import PropTypes from 'prop-types'
import { Grid, withStyles } from '@material-ui/core'

const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit,
  },
})
function Analytics(props) {
  const { classes } = props
  return (
    <Grid className={classes.root} spacing={8} container justify='space-evenly'>
      <Grid item xs>
        {props.left}
      </Grid>
      <Grid item xs>
        {props.middle}
      </Grid>
      <Grid item xs>
        {props.right}
      </Grid>
    </Grid>
  )
}

Analytics.propTypes = {
  classes: PropTypes.object.isRequired,
  left: PropTypes.node.isRequired,
  middle: PropTypes.node.isRequired,
  right: PropTypes.node.isRequired,
}
export default withStyles(styles)(Analytics)
