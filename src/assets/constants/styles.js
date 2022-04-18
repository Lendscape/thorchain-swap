import { makeStyles } from "@mui/styles";
// import { backGrid, boxShadow } from "../../config/style";

const useStyles = makeStyles((theme) => {
    return {
        Header: {
            margin: theme.spacing(2, 0),
            display: "flex",
            justifyContent: "space-evenly",
        },
        Content: {
            height: "100vh",
            display: "flex",
            justifyContent: "center",

            "& .content-box": {
                width: "430px",
                height: "544px",
                border: "solid 1px darkgrey",
                padding: "10px",
                "& .exchange": {
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "44px",
                },
                "& .sendtoken": {
                    marginTop: "60px",
                    "& .amount-input": {
                        height: "40px",
                    },
                    "& .asset": {
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "end",
                    },
                },
                "& .receivetoken": {
                    marginTop: "40px",
                    "& .amount-input": {
                        height: "40px",
                    },
                    "& .asset": {
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "end",
                    },
                },
                "& .action": {
                    marginTop: "60px",
                    display: "flex",
                    justifyContent: "center",
                },
            },
        },
        cWallet: {
            "& .cwallet-paper": {
                padding: theme.spacing(2),
                width: theme.spacing(45),
                background: "#fff",
                "& .connect": {
                    display: "flex",
                    justifyContent: "center",
                },
                "& .title": {
                    borderRadius: theme.shape.borderRadius,
                    display: "flex",
                    justifyContent: "space-between",
                    padding: theme.spacing(0.625),
                    "& > div": {
                        padding: theme.spacing(0),
                        flexGrow: 1,
                        "& h2": {
                            padding: theme.spacing(1, 2),
                            marginRight: theme.spacing(0.625),
                            borderRadius: theme.shape.borderRadius,
                            color: "#B8C5EC",
                        },
                    },
                    "& button": {
                        color: "#B8C5EC",
                    },
                    "& h2": {
                        color: "black",
                    },
                },
                "& .content": {
                    padding: theme.spacing(1, 0, 0, 0),
                    "& > ul": {
                        paddingBottom: 0,
                        "& .item": {
                            padding: theme.spacing(0.625, 2),
                            margin: theme.spacing(2, 0),
                            borderRadius: theme.shape.borderRadius,
                            cursor: "pointer",
                            "& .symbol": {
                                color: "white",
                                minWidth: theme.spacing(5.5),
                                "& svg": {
                                    fontSize: theme.spacing(3.5),
                                },
                                "& img": {
                                    width: `${theme.spacing(3.5)} !important`,
                                },
                            },
                            "& .activating-description": {
                                color: "black",
                                borderRadius: theme.shape.borderRadius,
                                padding: theme.spacing(0.5625, 2),
                                margin: 0,
                                "& p": {
                                    color: "black",
                                    fontSize: theme.spacing(1.375),
                                },
                            },
                            "& .description": {
                                borderRadius: theme.shape.borderRadius,
                                padding: theme.spacing(1.5, 2),
                                margin: 0,
                                color: "black",
                            },
                        },
                        "& .item-selected": {
                            padding: theme.spacing(0.625, 2),
                            margin: theme.spacing(2, 0),
                            borderRadius: theme.shape.borderRadius,
                            background: "#14353c",
                            cursor: "pointer",
                            "& .symbol": {
                                minWidth: theme.spacing(5.5),
                                "& svg": {
                                    fontSize: theme.spacing(3.5),
                                },
                                "& img": {
                                    width: `${theme.spacing(3.5)} !important`,
                                },
                            },
                            "& .activating-description": {
                                borderRadius: theme.shape.borderRadius,
                                padding: theme.spacing(0.5625, 2),
                                margin: 0,
                                "& p": {
                                    fontSize: theme.spacing(1.375),
                                },
                            },
                            "& .description": {
                                borderRadius: theme.shape.borderRadius,
                                padding: theme.spacing(1.5, 2),
                                margin: 0,
                                color: "white",
                            },
                        },
                        "& .action": {
                            "& button": {
                                marginRight: theme.spacing(1),
                                "& svg": {},
                            },
                        },
                        "& .state": {
                            paddingTop: theme.spacing(4),
                            paddingBottom: theme.spacing(4),
                            "& .symbol": {
                                display: "flex",
                                justifyContent: "center",
                                "& .MuiCircularProgress-root": {
                                    width: `${theme.spacing(3.5)}px !important`,
                                    height: `${theme.spacing(
                                        3.5
                                    )}px !important`,
                                },
                            },
                            "& .description": {
                                padding: theme.spacing(1.5, 1),
                            },
                        },
                        "& .activating-item": {
                            marginBottom: 0,
                        },
                    },
                },
            },
        },
        logo: {
            textShadow: "5px 3px 4px #a303db",
            fontFamily: "cursive !important",
            fontWeight: "bold !important",
        },
        Appbar: {
            background: "rgba(20, 14, 56, 0.9) !important",
            height: "80px",
            justifyContent: "center",
            padding: "43px",
            paddingLeft: "200px",
            paddingRight: "200px",
            "& .header-button": {
                marginRight: "50px",
                fontWeight: "700",
                fontSize: "16px",
                lineHeight: "30px",
                textTransform: "uppercase",
                color: "white",
                transition: "2s",

                // "&:hover": {

                // }
            },
        },
        Footer: {
            background: "#140e38 !important",
            height: "60px",
            paddingLeft: "200px",
            paddingRight: "200px",
            justifyContent: "center",
            "& > div > div ": {
                flexDirection: "row",
                "& > div ": {
                    flexDirection: "row",
                },
            },
        },
    };
});

export default useStyles;
