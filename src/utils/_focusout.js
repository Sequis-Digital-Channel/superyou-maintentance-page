export function focusout(node) {
  const handleFocusOut = () => {
    node.dispatchEvent(
      new CustomEvent('focus_out', node)
    )
  }

	node.addEventListener('focusout', handleFocusOut, true);
  
  return {
    destroy() {
      node.removeEventListener('focusout', handleFocusOut, true);
    }
	}
}