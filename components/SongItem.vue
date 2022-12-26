<template>
   <li class="flex justify-between items-center p-3 pl-6 cursor-pointer transition duration-300 hover:bg-gray-50 dark:hover:bg-gray-500">
      <div>
         <NuxtLink :to="'/songs/' + song.docID" class="font-bold block text-gray-600 dark:text-gray-50">
            {{ song.modified_name }}
         </NuxtLink>
         <span class="text-gray-500 text-sm dark:text-gray-50">{{ song.display_name }}</span>
      </div>

      <div class="text-gray-600 text-lg dark:text-gray-50">
         <NuxtLink :to="'/songs/' + song.docID + '#comments'" v-slot="{ navigate }">
            <span class="comments" @click="navigate">
               <i class="fa fa-comments text-gray-600 dark:text-gray-50"></i>
               {{ song.comment_count }}
            </span>
         </NuxtLink>
      </div>
   </li>
</template>

<script>
export default {
   name: "SongItem",
   props: {
      song: {
         required: true,
      }
   }
}
</script>

<script setup>

const { vIcon } = useVIcon()

</script>