import { Card, CardContent, Typography } from '@material-ui/core';
import React from 'react';

function Infobox({ title, cases, total }) {
    return (
         <Card className="infobox">
             <CardContent>
                    <Typography className="infobox_title" color="textSecondary">{ title }</Typography>
                    <h1 className="infobox_cases">{ cases }</h1>
                    <Typography className="infobox_total" color="textSecondary">{ total } Total</Typography>
             </CardContent>
        </Card>
    )
}

export default Infobox
