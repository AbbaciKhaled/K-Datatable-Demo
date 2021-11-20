import { Component, OnInit } from '@angular/core';
import { DataService } from './services/data/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

  data = {
    translation: {
      add: 'Add',
      filter: 'Filter',
      allItems: 'All',
      totalItems: 'Total items',
      show: 'Show'
    },
    style: {
      height: 466,
      overflowY: 'auto',
      stickyHeader: true,
      stickyFooter: true
    },
    view: {
      itemsPerPage: 10,
      showedItems: [10, 20, 50, 100]
    },
    addItem: true,
    header: [
      {
        name: "Reference",
        type: "number",
        sort: true,
        filter: true,
        width: 60
      },
      {
        name: "Name",
        type: "text",
        sort: true,
        filter: true,
        width: 120
      },
      {
        name: "Email",
        type: "email",
        sort: true,
        filter: true,
        width: 200
      },
      {
        name: "Status",
        type: "badge",
        sort: true,
        filter: true,
        width: 80
      },
      {
        name: "Country",
        type: "bold",
        sort: true,
        filter: true,
        width: 200
      },
      {
        name: "Progress",
        type: "progress",
        sort: true,
        filter: true,
        width: 180
      },
      {
        name: "Birthday",
        type: "date",
        sort: true,
        filter: true,
        width: 80
      },
      {
        name: "More details",
        type: "buttons",
        sort: false,
        filter: false,
        width: 80
      },
      {
        type: "mini-buttons",
        sort: false,
        filter: false,
        width: 50
      }
    ],
    footer: ["Reference", "Name", "Email", "Status", "Country", "Progress", "Date", "Details", ""],
    items: new Array()
  }

  jsonData: any

  constructor(private dataSevice: DataService) { }

  ngOnInit(): void {
    this.dataSevice.getData().subscribe(
      (data) => {
        this.jsonData = [...data]
        this.fetchData()
      }, (error) => {
        console.log(error)
        alert('Data not found.')
      }
    )
  }

  fetchData() {
    this.data.items = []
    let index = 0
    for (let item of this.jsonData) {
      this.data.items.push({
        inputData: {
          item: item,
          index: index
        },
        data: [
          {
            content: item?.reference,
          },
          {
            content: item?.name
          },
          {
            content: item?.email
          },
          {
            content: item?.status,
            styleClass: item?.status == 'Approved' ? 'k-bg-success' : item?.status == 'Unapproved' ? 'k-bg-danger' : null
          },
          {
            content: item?.country
          },
          {
            content: item?.progress
          },
          {
            content: {
              value: new Date(item?.birthday).toLocaleDateString("en-En"),
              date: new Date(item?.birthday)
            }
          },
          {
            content: [
              {
                styleClass: "k-bg-warning",
                title: "More details",
                event: "showMore"
              }
            ]
          },
          {
            content: [
              {
                styleClass: "fa fa-edit k-color-primary",
                title: "Update",
                event: "update"
              },
              {
                styleClass: "fa fa-trash k-color-danger",
                title: "Delete",
                event: "delete"
              }
            ]
          }
        ]
      })
      index++
    }
  }

  event(event: any) {
    switch (event?.name) {
      case 'add':
        this.jsonData.push({
          reference: 123456,
          name: 'Test Insert',
          email: 'testinser@mail.com',
          status: 'Approved',
          country: 'Algeria',
          progress: 50,
          birthday: new Date()
        })
        this.fetchData()
        alert('A new element event is added.')
        break
      case 'showMore':
        alert(JSON.stringify(this.jsonData[event?.outputData?.index], null, 4))
        break
      case 'update':
        this.jsonData[event?.outputData?.index].name = "Test Update"
        this.fetchData()
        alert(`Element ${event?.outputData?.item?.id} updated.`)
        break
      case 'delete':
        this.jsonData.splice(event?.outputData?.index, 1)
        this.fetchData()
        alert(`Element ${event?.outputData?.item?.id} deleted.`)
        break
    }
  }

}

