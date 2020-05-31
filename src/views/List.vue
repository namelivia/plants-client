<template>
  <section>
    <h1> PLANT LIST</h1>
    <table>
        <thead>
            <tr>
                <th>Name</th>
                <th>Picture</th>
                <th>Species</th>
                <th>Days until next watering</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            <tr v-for='plant in plants' :key='plant.id'>
                <td>{{plant.name}}</td>
                <td><img :src='plant.image_url' width="200" height="200"/></td>
                <td>{{plant.species}}</td>
                <td>{{plant.days_until_watering}}</td>
                <td><button>Water it</button></td>
            </tr>
        </tbody>
    </table>
  </section>
</template>

<script>
    export default {
        data: function () {
            //TODO: This will be empty, not it's just a stub
            return {
                plants: [
                    {
                        'id': 1,
                        'name': 'plant1',
                        'species': 'Black locust',
                        'days_until_watering': 1,
                        'image_url': 'https://www.ikea.com/es/en/images/products/fejka-artificial-potted-plant-in-outdoor-monstera__0614197_PE686822_S5.JPG'
                    }, {
                        'id': 2,
                        'name': 'plant2',
                        'species': 'Scots pine',
                        'days_until_watering': 5,
                        'image_url': 'https://www.ikea.com/es/en/images/products/fejka-artificial-potted-plant-in-outdoor-monstera__0614197_PE686822_S5.JPG'
                    }, {
                        'id': 3,
                        'name': 'plant3',
                        'species': 'Salvia cistus',
                        'days_until_watering': 8,
                        'image_url': 'https://www.ikea.com/es/en/images/products/fejka-artificial-potted-plant-in-outdoor-monstera__0614197_PE686822_S5.JPG'
                    }
                ]
            }
        },
        mounted: function() {
            //TODO: This will be the api call 
            /*this.$axios
            .get('endpoint')
            .then(response => console.log(response.data))*/
        }
    }
</script>
