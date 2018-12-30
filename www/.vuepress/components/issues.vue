<template>
    <div v-if="openbaseData" class="projects" v-show="showTopics">
        <table style="width: 110%; border: 0px; margin: 0px auto;">
            <tr>
                <th>Project</th>
                <th>Report</th>
            </tr>
            <tr v-for="project in projects" class="projects">
                <td>
                    <b>{{ project.label }}</b><br>
                </td>
                <td align="center">
                    <a target="_blank" :href="'https://github.com/openbase/' + project.id" style="color: inherit;">
                        <a :href="'https://github.com/openbase/'+ project.id + '/issues/new'">create new issue</a>
                    </a>
                </td>
            </tr>
        </table>
    </div>
</template>

<script>
    import Vue from 'vue'

    export default {
        data() {
            return {
                openbaseData: null,
                showTopics: true
            }
        },
        computed: {
            projects() {
                if (!this.openbaseData) return []
                return this.openbaseData.projects
            }
        },
        mounted() {
            console.log('load stuff')
            let url = '/openbase-data.json'

            fetch(url).then((resp) => {
                resp.json().then((json) => {
                    if (json.projects) {
                        this.openbaseData = json
                    }
                });
            }).catch((err) => {
                console.log('Failed fetching project list from - check above for CORS error messages')
            })
        }
    }
</script>
