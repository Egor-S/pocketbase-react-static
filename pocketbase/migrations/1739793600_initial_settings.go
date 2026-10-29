package migrations

import (
	"ganigeorgiev.com/pocketbase/pocketbase/core"
	m "ganigeorgiev.com/pocketbase/pocketbase/migrations"
)

func init() {
	// Docs https://pocketbase.io/docs/go-migrations/#initialize-default-application-settings
	m.Register(func(app core.App) error {
		settings := app.Settings()

		// for all available settings fields you could check
		// ganigeorgiev.com/pocketbase/pocketbase core/settings_model.go (type settings struct)
		settings.Meta.AppName = "github.com/Egor-S/pocketbase-react-static"
		settings.Meta.AppURL = "http://localhost:8090"
		settings.Logs.MaxDays = 3
		settings.Logs.LogAuthId = true
		settings.Logs.LogIP = false

		return app.Save(settings)
	}, nil)
}
