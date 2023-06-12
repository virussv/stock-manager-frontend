import { createSlice, PayloadAction } from '@reduxjs/toolkit';

/*normally I don't use redux for non-global states, however, for my animations where I change the state to 
true and after 500ms I change it to false the redux state works much better in exchanging components/values with input animations, because when I use a react state as a dependency in useEffect, the useEffect is triggered, 
letting the element appear before the animation occurs, so what happens is that when entering a value or component for another, that value/component first appears, then the animation is activated, like this strange, already with a state of redux in the exchange of value/compenent with an animation, 
the component/value does not appear on the screen before animating, but rather at the same moment. to y: 0, 
and my element already starts at 0, so if the animation occurs after the input of the component/value first, 
it goes from y:0 to y:15 and so y:0 again, leaving it strange on the screen, for this animation starts together for, first y:15 and then y:0, the animation occurs normally*/

const sliceGraph = createSlice({
	name: 'graph',
	initialState: {
		animeGraph: false,
	},
	reducers: {
		setAnimeGraph(state,action:PayloadAction<boolean>) {
			state.animeGraph = action.payload;
		},
	},
});

export const { setAnimeGraph } = sliceGraph.actions; 
export default sliceGraph.reducer;