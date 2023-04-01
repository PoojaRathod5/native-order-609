import { Box, Flex, Grid } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getData } from "../../redux/adminproduct/action";
import { ProductCard } from "../component/Card";
import { LoadingSkeleton } from "../component/LoadingSkeleton";

export const Product = () => {
	const product = useSelector((store) => store.adminProductReducer.products);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getData());
	}, []);

	return (
		<Flex margin={"auto"} justifyContent={"space-around"} p={"2"}>
			<Grid
				width={"85%"}
				justifyContent={"space-between"}
				templateColumns={{
					base: `repeat(1, 1fr)`,
					sm: `repeat(2,1fr)`,
					md: `repeat(3,1fr)`,
					lg: `repeat(4,1fr)`,
				}}
				gap={"4"}
			>
				{product?.length ? (
					product.reverse().map((ele) => <ProductCard key={ele._id} {...ele} />)
				) : (
					<LoadingSkeleton />
				)}
			</Grid>
		</Flex>
	);
};