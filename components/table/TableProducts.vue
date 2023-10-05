<template>
  <div class="card">
    <table class="min-w-full">
      <thead>
        <tr>
          <th v-for="column in columns" :key="column">{{ column }}</th>
        </tr>
      </thead>
      <tbody v-if="data" class="text-center">
        <tr v-for="(row, index) in data" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ row.name }}</td>
          <td>{{ row.category.name }}</td>
          <td>{{ row.quantity }}</td>
          <td>{{ row.basic_price }}</td>
          <td>{{ row.selling_price }}</td>
          <td>{{ row.slug }}</td>
          <td>
            <button>hello</button>
            <button>hello</button>
          </td>
          <!-- <td v-for="(value, key) in row" :key="key" :class="[key === 'no' ? 'text-center' : '']">
            {{ value }}
          </td> -->
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  props: {
    columns: Array,
    data: Array,
  },
};
</script>