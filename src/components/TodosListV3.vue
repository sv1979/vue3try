<template>
  <h2>{{ title }}</h2>
  <ul class="todos">
    <li v-for="(task, index) in state.todos" :key="index">
      <div
        v-on:click="toggleTaskStatus(task)"
        :class="{ completed: task.completed }"
      >
        {{ task.title }}
      </div>
      <button v-on:click="deleteTask(task)">Delete</button>
    </li>
  </ul>
  <input type="text" v-model="state.new_task" v-on:keypress.enter="addTask" />
  <button v-on:click="addTask">Add</button>

  <hr />
  <div>
    <strong>Completed: {{ state.completedTodosCount }}</strong
    ><br />
    <strong>Pending: {{ state.pendingTodosCount }}</strong>
  </div>
</template>

<script>
import { computed, reactive } from "vue";

export default {
  props: {
    title: String,
  },
  setup(props, context) {
    console.log(props, context);
    const state = reactive({
      new_task: "",
      todos: [],
      completedTodosCount: computed(() => {
        return state.todos.filter((task) => task.completed).length;
      }),

      pendingTodosCount: computed(() => {
        return state.todos.filter((task) => !task.completed).length;
      }),
    });

    function toggleTaskStatus(task) {
      task.completed = !task.completed;
    }

    function deleteTask(task) {
      var index = state.todos.indexOf(task);
      state.todos.splice(index, 1);
    }

    function addTask() {
      if (state.new_task) {
        state.todos.push({ title: state.new_task, completed: false });
        state.new_task = "";
      }
    }

    return {
      state,
      toggleTaskStatus,
      deleteTask,
      addTask,
    };
  },
};
</script>

<style scoped>
.completed {
  text-decoration: line-through;
}
</style>