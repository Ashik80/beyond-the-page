package main

import "net/http"

func main() {
	http.Handle("/components/", http.StripPrefix("/components/", http.FileServer(http.Dir("./components"))))
	http.Handle("/services/", http.StripPrefix("/services/", http.FileServer(http.Dir("./services"))))
	http.Handle("/styles/", http.StripPrefix("/styles/", http.FileServer(http.Dir("./styles"))))
	http.Handle("/pages/", http.StripPrefix("/pages/", http.FileServer(http.Dir("./pages"))))
	http.Handle("/assets/", http.StripPrefix("/assets/", http.FileServer(http.Dir("./assets"))))

	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		http.ServeFile(w, r, "index.html")
	})

	http.ListenAndServe(":3000", nil)
}
