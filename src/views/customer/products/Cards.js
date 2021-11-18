import * as React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import CardActionArea from "@material-ui/core/CardActionArea";
import { useDispatch, useSelector } from "react-redux";
import { helper } from "src/helper";

function Cards() {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.product.productData);

    const convertDate = (date) => {
        // whatever formatting you want to do can be done here
        var d = date.toString();
        return d.substr(0, 10);
    };
    return (
        <>
            <div className="row">
                {products.map((product, i) => (
                    <div className="col-2" key={i}>
                        <Card
                            sx={{ maxWidth: 300 }}
                            className="m-3"
                            style={{ borderRadius: "8px" }}
                        >
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    height="150"
                                    image={helper.IMAGE_BASEURL + product.photo[0]}
                                    alt=""
                                    style={{ borderRadius: "16px" }}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {product.title}
                                    </Typography>
                                    <Typography variant="body1" color="secondary">
                                        {product.created_by.name}
                                    </Typography>
                                    <br />
                                    <Typography gutterBottom variant="body2">
                                        Offer Price: {product.offer_price}
                                    </Typography>
                                    <Typography gutterBottom variant="body2">
                                        Price: {product.price}
                                    </Typography>

                                    <Typography gutterBottom variant="body2">
                                        Created At: {convertDate(product.created_at)}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </div>
                ))}
            </div>
        </>
    );
}

export default Cards;
