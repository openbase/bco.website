<script setup>
import ParentLayout from '@vuepress/theme-default/layouts/Layout.vue'
import Footer from '../components/Footer.vue'
</script>

<template>
  <ParentLayout>
    <template #page-bottom>
      <Footer slot="page-bottom" />
      <!-- <div class="my-footer">This is my custom page footer</div> -->
    </template>
  </ParentLayout>
</template>

<!-- <style lang="css">
.my-footer {
  text-align: center;
}
</style> -->