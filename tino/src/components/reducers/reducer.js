function todos(state, action) {
  switch (action.type) {
	case 'ADD_TO_CART':
		
		let addedItem = state.items.find(item => item.name == action.item.name && item.weight == action.item.weight);
		let addedItemIndex = state.items.indexOf(addedItem);
		
		if(addedItem){
			
			addedItem.count += action.quan;
			
			return state;
		}else{
			
			let newIndex = state.items.length+1;
			action.item.id = newIndex;
			
			return {items: [...state.items, action.item]}
		}
		break;
	
	case 'CHANGE_QUANTITY':
		
		let relItem = state.items.find(item => item.id == action.itemId);
    	
    	relItem.count = action.newCount;
   		
   		return {items: [...state.items]}
   		break;
	
	case 'SET_CART_ITEMS':
	
		return {items: action.newItemsSet}
		break;
	
	case 'DELETE_ITEM':
	
		return {items: state.items.filter(item => item.id != action.itemId)}
		break;
    
    default:
      return state
  }
}

export default todos