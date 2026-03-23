from langgraph.graph import StateGraph, END
from typing import TypedDict, Annotated, Sequence
import operator

class AgentState(TypedDict):
    messages: Sequence[str]
    next_step: str

def navigation_agent(state: AgentState):
    # Intelligent chatbot agent that can perform site actions
    return {"next_step": "perform_action"}

def action_executor(state: AgentState):
    # Executes actions (e.g. increase font size, open dashboard)
    return {"messages": ["Action performed successfully."]}

workflow = StateGraph(AgentState)
workflow.add_node("agent", navigation_agent)
workflow.add_node("executor", action_executor)

workflow.set_entry_point("agent")
workflow.add_edge("agent", "executor")
workflow.add_edge("executor", END)

app = workflow.compile()
