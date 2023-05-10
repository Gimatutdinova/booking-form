import svgSprite from 'gulp-svg-sprite';

export const svgSprive = () => {
    return app.gulp.src(`${app.path.src.svgicons}`, {})
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "JS",
                message: "Error: <%= error.message %>"
            }))
        )
        .pipe(
            app.plugins.if(
                app.isDev,
                svgSprite({
                mode: {
                    stack: {
                        sprite: `../icons/icons.svg`,
                        // Создание страницы с перечнем иконок
                        example: true
                    }
                }
            }))
        )
        .pipe(
            app.plugins.if(
                app.isDev,
                app.gulp.dest(`${app.path.build.images}`)
            )
        )
}