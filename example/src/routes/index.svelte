<p class="text-4xl mt-4 mx-auto text-center">GrayScale Visualizer</p>
<input type="file" class="block border-gray-200 divide-y text-lg mx-auto mt-16" on:change="{upload}" accept=".jpg, .jpeg, .png" multiple="{false}" />
{#if !!loadImgSrc}
<label class="flex align-center justify-center mt-6 text-base" for="select">
    <div class="flex items-center justify-center mr-4">
        select grayScale mode:
    </div>
    <select name="value" id="select" class="border-2 border-gray-200" on:change="{onSelect}">
        {#each OPTIONS as option, index}
            <option value="{index}" title="{option.description}">{option.name}</option>
        {/each}
        <option value="" selected></option>
    </select>
</label>
<img bind:this={imgRef} class="unvisible" src={loadImgSrc} on:load="{imgLoaded}" alt="error">
{/if}
<canvas class="block mx-auto mt-8" bind:this={unvisibleCanvasRef} />

<script lang="ts">
    import '../app.css';
    import { grayScaleByBalance, grayScaleByBalanceWeight, grayScaleByColorChannel, grayScaleByMaxColorValue } from '../../../src/grayScale';

    // variables
    const OPTIONS = [
        {
            name: 'AVG',
            value: grayScaleByBalance,
            description: 'GrayScale by balance',
        },
        {
            name: 'WAVG',
            value: grayScaleByBalanceWeight,
            description: 'GrayScale by balance weight',
        },
        {
            name: 'COLORWEIGHT',
            value: grayScaleByColorChannel,
            description: 'GrayScale by color weight',
        },
        {
            name: 'MAX',
            value: grayScaleByMaxColorValue,
            description: 'GrayScale by max color value',
        },
    ];

    // state
    let loadImgSrc = '';
    let imgRef: HTMLImageElement;
    let unvisibleCanvasRef: HTMLCanvasElement;
    let selectGrayScale = -1;

    // lifecycle
    $: {
        if (selectGrayScale >= 0) {
            renderCanvas();
        }
    }

    // methods
    const upload = (e: any) => {
        loadImgSrc = URL.createObjectURL(e.target.files[0]);
        console.log(loadImgSrc);
    }

    const imgLoaded = () => {
        URL.revokeObjectURL(loadImgSrc);
        renderCanvas();
    }

    const onSelect = (e: any) => {
        selectGrayScale = e.target.value;
    }

    const renderCanvas = () => {
        if (selectGrayScale < 0) return;
        const ctx = unvisibleCanvasRef.getContext('2d')!;
        // 设置宽高
        unvisibleCanvasRef.width = imgRef.width;
        unvisibleCanvasRef.height = imgRef.height;
        ctx?.drawImage(imgRef, 0, 0);
        const imageData = ctx.getImageData(0, 0, imgRef.width, imgRef.height);
        const data = imageData.data;
        for (var i = 0; i < data.length; i += 4) {
            // 这里对a通道不做处理，因为a通道为透明度，不需要处理
            const [r,g,b] = OPTIONS[selectGrayScale].value([data[i], data[i + 1], data[i + 2]]);
            data[i] = r;
            data[i + 1] = g;
            data[i + 2] = b;
        }
        ctx.putImageData(imageData, 0, 0);
    }
</script>
<style scoped>
    .unvisible {
        position: absolute;
        z-index: -9999;
        top: 99999px;
        left: 99999px;
        visibility: hidden;
        display: none;
    }
</style>